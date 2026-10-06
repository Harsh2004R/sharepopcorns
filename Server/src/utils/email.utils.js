import { Resend } from "resend";
import { ENV } from "../config/env.config.js";

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: ENV.EMAIL_FROM, //  Replace with your verified Resend domain
      to,
      subject,
      html,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("[EMAIL_ERROR]", error);
    throw error;
  }
};

export const sendOtpEmail = async (to, otp, type = "VERIFY_EMAIL") => {
  const isVerify = type === "VERIFY_EMAIL";
  const subject = isVerify
    ? "Verify your email address"
    : "Reset your password";
  const title = isVerify
    ? "Welcome to IndianLivingThing!"
    : "Password Reset Request";
  const action = isVerify ? "verify your email address" : "reset your password";

  // Extremely fast HTML string generation (no EJS compilation needed)
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">${title}</h2>
      <p style="color: #555; line-height: 1.5;">Hello,</p>
      <p style="color: #555; line-height: 1.5;">Please use the following OTP to ${action}. This code is valid for <strong>10 minutes</strong>.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 24px; font-weight: bold; background: #f4f4f4; padding: 10px 20px; border-radius: 6px; letter-spacing: 4px; color: #000;">
          ${otp}
        </span>
      </div>
      <p style="color: #999; font-size: 12px; text-align: center;">If you did not request this, please ignore this email.</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
};
