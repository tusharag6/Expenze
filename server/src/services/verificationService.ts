// services/verificationService.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyEmail = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verified: true,
          verificationToken: null,
        },
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Error occurred during verification");
  }
};
