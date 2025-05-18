export const otpTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="padding: 40px 20px; text-align: center; background-color: #f8f9fa;">
      <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Your One-Time Password</h1>
      <p style="color: #666666; font-size: 16px; margin-bottom: 30px;">Use the following OTP to complete your verification:</p>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; display: inline-block;">
        <span style="font-size: 28px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">{{otp}}</span>
      </div>
      <p style="color: #666666; font-size: 14px; margin-top: 30px;">This OTP is valid for {{validity}} minutes. Please do not share it with anyone.</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; text-align: center; background-color: #f8f9fa;">
      <p style="color: #999999; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
    </td>
  </tr>
</table>
`
export type OtpTemplateContext = {
  otp: string
  validity: number
}
