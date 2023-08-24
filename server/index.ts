import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { PrismaClient, User } from "@prisma/client";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./utils/verification";
dotenv.config();

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.use(express.json()); // Parse JSON request bodies

const JWT_SECRET = process.env.JWT_SECRET || "default";

// Register Route
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let verificationToken = crypto.randomBytes(32).toString("hex");

    // Create a new user in the database with hashed password
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        verificationToken,
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

    // Find a user in the database based on provided email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Retrieve user information route
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

app.post("/send-verification", async (req, res) => {
  const { email, verificationToken } = req.body;
  try {
    await sendVerificationEmail(email, verificationToken);
    res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

// Endpoint for verifying email
app.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (user) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          verified: true,
          verificationToken: null,
        },
      });
      res.redirect(`${process.env.FRONTEND_URL}/login`);

      // res.sendStatus(200);
    } else {
      // res.redirect(`${process.env.FRONTEND_URL}/login`);
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error occurred during verification:", error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
