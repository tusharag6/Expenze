import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default";

export const getUserById = async (token: string) => {
  const decodedToken: any = jwt.verify(token, JWT_SECRET);
  const userId = decodedToken.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
};

export const getUserIdFromToken = (token: string) => {
  const decodedToken: any = jwt.verify(token, JWT_SECRET);
  return decodedToken.userId;
};

export const checkAccountOwnership = async (
  accountId: number,
  userId: number
) => {
  const userAccount = await prisma.account.findFirst({
    where: { id: accountId, user_id: userId },
  });

  if (!userAccount) {
    throw new Error("Account not found or doesn't belong to the user.");
  }

  return userAccount;
};
