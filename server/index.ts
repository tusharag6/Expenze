import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.use(express.json()); // Parse JSON request bodies

const JWT_SECRET = "secret";

// Register Route
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    res.status(201).json(newUser); // Return the newly created user
  } catch (error) {
    res.status(500).json({ msg: "Error creating user.", error });
  }
});

// Login route
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.json({ token });
    // res.status(200).json(user); // Return the user upon successful login
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
