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

export const changeRoleToOwner = async (userId: number) => {
  const updatedUserData = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "Owner",
    },
  });
  return updatedUserData;
};
