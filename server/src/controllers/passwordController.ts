import { Request, Response } from "express";
import { passwordService } from "../services";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await passwordService.forgotPassword(email);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    await passwordService.resetPassword(token, password);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

export const checkToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    await passwordService.checkToken(token);
    res.sendStatus(200); // Token is valid
  } catch (error) {
    res.sendStatus(400); // Invalid token
  }
};
