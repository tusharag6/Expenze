import transporter from "./mailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
) {
  const mailOptions = {
    from: '"Expenze " <expenzeapp@gmail.com>',
    to: email,
    subject: "Account Verification",
    html: `
      <p>Please click <a href="${process.env.APP_URL}/verify/${verificationToken}">here</a> to verify your account.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  await prisma.user.update({
    where: { email },
    data: { verificationToken },
  });
}
