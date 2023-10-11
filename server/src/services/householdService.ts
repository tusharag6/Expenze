import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewHousehold = async (userId: number, joiningId: string) => {
  const newHousehold = await prisma.household.create({
    data: {
      ownerUserId: userId,
      joiningId,
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

export const changeRoleToMember = async (userId: number) => {
  const updatedUserData = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "Member",
    },
  });
  return updatedUserData;
};

export const findHouseholdIdFromJoiningId = async (joiningId: string) => {
  const household = await prisma.household.findFirst({
    where: {
      joiningId: joiningId,
    },
  });
  const householdId = household?.id;

  return householdId;
};

export const joinNewHousehold = async (userId: number, householdId: number) => {
  const newHouseholdMember = await prisma.householdMember.create({
    data: {
      userId,
      householdId,
    },
  });

  return newHouseholdMember;
};

export const addNewAccountToHousehold = async (
  householdId: number,
  accountId: number
) => {
  const newAccount = await prisma.householdAccount.create({
    data: {
      householdId,
      accountId,
    },
  });
  return newAccount;
};
