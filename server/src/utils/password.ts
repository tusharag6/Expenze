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
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Recovery</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .recovery-link {
                    color: #007BFF;
                    text-decoration: none;
                }
                .recovery-link:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Recovery</h1>
                <p>Hello,</p>
                <p>We received a request to reset your password for your Expenze account.</p>
                <p>If you made this request, please click the following link to reset your password:</p>
                <p><a class="recovery-link" href="${process.env.FRONTEND_URL}/forgot-password/${resetToken}">Reset Password</a></p>
                <p>If you did not request a password reset or believe this email was sent to you by mistake, you can safely ignore it.</p>
                <p>If you need further assistance, please don't hesitate to contact our support team at expenzeapp@gmail.com .</p>
                <p>Thank you for using Expenze!</p>
            </div>
        </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
