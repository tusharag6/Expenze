import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default";

export async function isEmailAlreadyTaken(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return !!user; // If user exists, return true; otherwise, return false.
}

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    // Check if the email is already in use
    const emailTaken = await isEmailAlreadyTaken(email);

    if (emailTaken) {
      // Email is already in use, throw an error or handle it as needed
      throw new Error("Email is already registered.");
    } else {
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
      return newUser;
    }
  } catch (error) {
    throw new Error("Error creating user.");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Find a user in the database based on provided email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { token, user };
  } catch (error) {
    throw new Error("Server error");
  }
};
