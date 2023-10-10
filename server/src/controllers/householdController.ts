import { Request, Response } from "express";
import { request } from "http";
import { householdService, userService } from "../services";

export const createHousehold = async (req: Request, res: Response) => {
  try {
    // Getting the token from req header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    let userId = undefined;

    // Check if user exists, if exist find userId
    const user = await userService.getUserById(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      userId = user.id;
    }

    const newHousehold = await householdService.createNewHousehold(userId);
    res.status(201).json(newHousehold);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating household.", error });
  }
};
