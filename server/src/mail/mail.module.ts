import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailService } from './mail.service'
import config from 'src/config'
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config().mail.smtp.host,
        secure: true,
        port: config().mail.smtp.port,
        auth: {
          user: config().mail.smtp.auth.user,
          pass: config().mail.smtp.auth.pass,
        },
      },
      defaults: {
        from: config().mail.defaults.from,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
