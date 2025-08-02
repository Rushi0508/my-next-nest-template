import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'src/common/config';

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
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
  }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        from: `"${config.mail.defaults.fromName}" <${config.mail.defaults.from}>`,
        ...options,
      });
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
