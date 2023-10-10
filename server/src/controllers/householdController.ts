import { Request, Response } from "express";
import { request } from "http";
import { householdService, userService } from "../services";

export const createHousehold = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    // Generate joining Id
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let joiningId = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      joiningId += characters.charAt(randomIndex);
    }

    const newHousehold = await householdService.createNewHousehold(
      userId,
      joiningId
    );

    const updatedUserData = await householdService.changeRoleToOwner(userId);
    res.status(201).json({ newHousehold, updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating household.", error });
  }
};

export const joinHousehold = async (req: Request, res: Response) => {
  try {
    const { joiningId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = userService.getUserIdFromToken(token);

    const householdId = await householdService.findHouseholdIdFromJoiningId(
      joiningId
    );
    if (!householdId) {
      return res.status(401).json({ message: "Unauthorized to join" });
    }
    const newHouseholdMember = await householdService.joinNewHousehold(
      userId,
      householdId
    );
    const updatedUserData = await householdService.changeRoleToMember(userId);
    res.status(201).json(newHouseholdMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error joining household.", error });
  }
};
