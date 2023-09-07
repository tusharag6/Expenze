import transporter from "./mailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function nodemailerSendVerificationEmail(
  email: string,
  verificationToken: string
) {
  const mailOptions = {
    from: '"Expenze " <expenzeapp@gmail.com>',
    to: email,
    subject: "Account Verification",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
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
            .verification-link {
                color: #007BFF;
                text-decoration: none;
            }
            .verification-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Account Verification</h1>
            <p>Hello,</p>
            <p>Thank you for signing up for an account with Expenze!</p>
            <p>To activate your account, please click the following link:</p>
            <p><a class="verification-link" href="${process.env.APP_URL}/api/auth/verify/${verificationToken}">Verify Your Account</a></p>
            <p>If you did not request this verification or believe this email was sent to you by mistake, you can safely ignore it.</p>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team at expenzeapp@gmail.com .</p>
            <p>Thank you for choosing Expenze!</p>
        </div>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
  await prisma.user.update({
    where: { email },
    data: { verificationToken },
  });
}
