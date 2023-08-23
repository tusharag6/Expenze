import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

// Get a user by ID
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
