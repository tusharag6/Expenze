import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default";

router.post("/", async (req, res) => {
  try {
    const { budgetCategory, amount } = req.body;
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ msg: "user not found." });
    }

    // Add new category in the database
    const newCategory = await prisma.budgetCategory.create({
      data: {
        budgetCategory,
        amount,
        user_id: userId,
      },
    });
    console.log(newCategory);

    res.status(201).json(newCategory); // Return the newly created category
  } catch (error) {
    res.status(500).json({ msg: "Error creating category.", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch categories for the account
    const budgetCategory = await prisma.budgetCategory.findMany({
      where: { user_id: userId },
    });

    res.status(200).json(budgetCategory);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching categories.", error });
  }
});
export default router;
