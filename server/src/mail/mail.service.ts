import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { Template, templates, TemplateContextMap } from './templates'
import config from 'src/config'

/**
 * Service responsible for handling all email-related operations.
 * Provides functionality for sending regular emails, template-based emails, and emails with attachments.
 *
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private mailService: MailService) {}
 *
 * // Send a simple email
 * await mailService.sendMail({
 *   to: 'user@example.com',
 *   subject: 'Hello',
 *   text: 'Hello World!'
 * });
 * ```
 */
@Injectable()
export class MailService {
  /**
   * Creates an instance of MailService.
   * @param mailerService - The NestJS mailer service for sending emails
   */
  constructor(private mailerService: MailerService) {}

  /**
   * Sends an email using the configured transporter.
   *
   * @param options - The email options
   * @param options.to - Recipient email address(es)
   * @param options.subject - Email subject line
   * @param options.text - Plain text content of the email (optional)
   * @param options.html - HTML content of the email (optional)
   * @returns Promise resolving to true if email was sent successfully, false otherwise
   *
   * @example
   * ```typescript
   * const sent = await mailService.sendMail({
   *   to: 'user@example.com',
   *   subject: 'Welcome',
   *   html: '<h1>Welcome to our platform!</h1>'
   * });
   * ```
   */
  public async sendMail(options: {
    to: string | string[]
    subject: string
    text?: string
    html?: string
  }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        from: `"${config().mail.defaults.fromName}" <${config().mail.defaults.from}>`,
        ...options,
      })
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  /**
   * Sends an email using a predefined template.
   * Provides type safety for template context based on the selected template.
   *
   * @template T - The template name (must be a key of available templates)
   * @param options - The template email options
   * @param options.to - Recipient email address(es)
   * @param options.subject - Email subject line
   * @param options.templateName - Name of the template to use
   * @param options.context - Context data for the template (type-safe based on template)
   * @returns Promise resolving to true if email was sent successfully, false otherwise
   *
   * @example
   * ```typescript
   * // Sending an OTP email (type-safe context)
   * await mailService.sendTemplateMail({
   *   to: 'user@example.com',
   *   subject: 'Your OTP',
   *   templateName: 'OTP',
   *   context: {
   *     otp: '123456',
   *     validity: 5
   *   }
   * });
   * ```
   */
  async sendTemplateMail<T extends Template>(options: {
    to: string | string[]
    subject: string
    templateName: T
    context: TemplateContextMap[T]
  }): Promise<boolean> {
    const html = this.renderTemplate(templates[options.templateName], options.context)
    return this.sendMail({
      to: options.to,
      subject: options.subject,
      html,
    })
  }

  /**
   * Sends an email with file attachments.
   *
   * @param options - The email options with attachments
   * @param options.to - Recipient email address(es)
   * @param options.subject - Email subject line
   * @param options.text - Plain text content of the email (optional)
   * @param options.html - HTML content of the email (optional)
   * @param options.attachments - Array of file attachments (optional)
   * @param options.attachments[].filename - Name of the attached file
   * @param options.attachments[].content - Content of the file (Buffer or string)
   * @returns Promise resolving to true if email was sent successfully, false otherwise
   *
   * @example
   * ```typescript
   * await mailService.sendMailWithAttachment({
   *   to: 'user@example.com',
   *   subject: 'Your Invoice',
   *   text: 'Please find your invoice attached.',
   *   attachments: [{
   *     filename: 'invoice.pdf',
   *     content: Buffer.from('...') // PDF content
   *   }]
   * });
   * ```
   */
  async sendMailWithAttachment(options: {
    to: string | string[]
    subject: string
    text?: string
    html?: string
    attachments?: Array<{
      filename: string
      content: Buffer | string
    }>
  }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        from: `"${config().mail.defaults.fromName}" <${config().mail.smtp.auth.user}>`,
        ...options,
      })
      return true
    } catch (error) {
      console.error('Failed to send email with attachment:', error)
      return false
    }
  }

  private renderTemplate<T extends Template>(template: string, context: TemplateContextMap[T]): string {
    let rendered = template
    Object.entries(context).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value))
    })
    return rendered
  }
}
