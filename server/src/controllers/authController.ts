import { Request, Response } from "express";
import { authService } from "../services";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await authService.registerUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: "Error creating user.", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
