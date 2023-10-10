import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewHousehold = async (userId: number) => {
  const newHousehold = await prisma.household.create({
    data: {
      ownerUserId: userId,
    },
  });
  return newHousehold;
};
