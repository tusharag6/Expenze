import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendForgotPasswordEmail } from "../utils/password";

const prisma = new PrismaClient();

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Delete any previous reset tokens for the user
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 900000; // Token valid for 1 hour

  await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      userId: user.id,
      expiresAt: new Date(resetTokenExpiry),
    },
  });

  try {
    await sendForgotPasswordEmail(email, resetToken);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

export const resetPassword = async (token: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expiresAt: { gte: new Date() } },
  });

  if (!resetToken) {
    throw new Error("Invalid or expired token");
  }

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
};

export const checkToken = async (token: string) => {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expiresAt: { gte: new Date() } },
  });

  if (!resetToken) {
    throw new Error("Invalid token");
  }
};
