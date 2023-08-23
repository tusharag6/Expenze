import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
const prisma = new PrismaClient();

app.use(express.json()); // Parse JSON request bodies

// Register Route
app.post("/api/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    res.json(newUser); // Return the newly created user
  } catch (error) {
    res.status(500).json({ msg: "Error creating user.", error });
  }
});

// Login route
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user); // Return the user upon successful login
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
      res.json(user); // Return the user with the specified ID
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
