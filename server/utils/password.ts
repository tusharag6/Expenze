import transporter from "./mailer";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function sendForgotPasswordEmail(
  email: string,
  resetToken: string
) {
  const mailOptions = {
    from: '"Expenze " <expenzeapp@gmail.com>',
    to: email,
    subject: "Password Recovery",
    html: `
      <p>Please click <a href="${process.env.FRONTEND_URL}/forgot-password/${resetToken}">here</a> to recover your passowrd.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
