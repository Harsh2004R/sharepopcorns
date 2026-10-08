import { Resend } from "resend";
import { ENV } from "../config/env.config.js";

let resendClient;

const getResendClient = () => {
  if (!resendClient) {
    resendClient = new Resend(ENV.RESEND_API_KEY);
  }
  return resendClient;
};

export const sendEmail = async ({ to, subject, html }) => {
  if (!ENV.RESEND_API_KEY) {
    if (ENV.NODE_ENV === "production") {
      throw new Error("Email is not configured");
    }
    console.warn("[EMAIL_SKIPPED] RESEND_API_KEY is not configured");
    return { skipped: true };
  }

  try {
    const { data, error } = await getResendClient().emails.send({
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

export const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${ENV.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p style="color: #555; line-height: 1.5;">Hello,</p>
      <p style="color: #555; line-height: 1.5;">Use the following link to reset your password. This link is valid for <strong>10 minutes</strong>.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="font-size: 16px; font-weight: bold; background: #111; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
          Reset password
        </a>
      </div>
      <p style="color: #555; line-height: 1.5; word-break: break-all;">${resetUrl}</p>
      <p style="color: #999; font-size: 12px; text-align: center;">If you did not request this, please ignore this email.</p>
    </div>
  `;

  return sendEmail({
    to,
    subject: "Reset your password",
    html,
  });
};
