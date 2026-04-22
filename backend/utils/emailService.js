// utils/emailService.js
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

export const sendResetEmail = async (toEmail, resetLink) => {
  const mailOptions = {
    from: `"Coza Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your Password — Coza Store",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #c8460a; margin-bottom: 8px;">Reset your password</h2>
        <p style="color: #444; line-height: 1.6;">
          We received a request to reset the password for your Coza Store account.
          Click the button below to choose a new password.
        </p>
        <a href="${resetLink}"
          style="display: inline-block; margin: 24px 0; padding: 14px 28px;
                 background: #c8460a; color: #ffffff; text-decoration: none;
                 border-radius: 6px; font-weight: bold; font-size: 15px;">
          Reset Password
        </a>
        <p style="color: #888; font-size: 13px; line-height: 1.6;">
          This link will expire in <strong>1 hour</strong>. If you didn't request
          a password reset, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 12px;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${resetLink}" style="color: #c8460a;">${resetLink}</a>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
