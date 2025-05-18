import { otpTemplate, type OtpTemplateContext } from './otp-template'

export const templates = {
  OTP: otpTemplate,
} as const

export type Template = keyof typeof templates

export type TemplateContextMap = {
  OTP: OtpTemplateContext
}
