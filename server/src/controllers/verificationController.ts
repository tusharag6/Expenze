import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verificationService } from "../services";

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email, verificationToken } = req.body;
  try {
    await sendVerificationEmail(email, verificationToken);
    res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    await verificationService.verifyEmail(token);
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  } catch (error) {
    console.error("Error occurred during verification:", error);
    res.sendStatus(500);
  }
};
