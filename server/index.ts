import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { PrismaClient, User } from "@prisma/client";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./utils/verification";
import { sendForgotPasswordEmail } from "./utils/password";
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

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Check if user with the provided email exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Delete any previous reset tokens for the user
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 900000; // Token valid for 1 hour

  // Store token in database
  await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      userId: user.id,
      expiresAt: new Date(resetTokenExpiry),
    },
  });

  try {
    await sendForgotPasswordEmail(email, resetToken);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Endpoint to handle password reset
app.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Find token in the database
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expiresAt: { gte: new Date() } },
  });

  if (!resetToken) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  // Update user's password
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Delete the used token
  await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

  res.json({ message: "Password reset successful" });
});

app.post("/check-token", async (req, res) => {
  const { token } = req.body;

  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expiresAt: { gte: new Date() } },
  });

  if (resetToken) {
    res.sendStatus(200); // Token is valid
  } else {
    res.sendStatus(400); // Invalid token
  }
});

app.post("/accounts", async (req, res) => {
  try {
    const { accountName, accountNumber, initialBalance } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const secretKey = process.env.JWT_SECRET;
    // console.log(secretKey);

    const decodedToken = jwt.verify(token, secretKey as jwt.Secret) as {
      userId: number;
    };
    // console.log(decodedToken);

    const userId = decodedToken.userId;
    // console.log(userId);

    // Add new transaction in the database
    const newAccount = await prisma.account.create({
      data: {
        account_name: accountName,
        account_number: accountNumber,
        initial_balance: initialBalance,
        user_id: userId,
      },
    });
    console.log(newAccount);

    res.status(201).json(newAccount); // Return the newly created account
  } catch (error) {
    res.status(500).json({ msg: "Error creating account.", error });
  }
});

app.get("/accounts", async (req, res) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const secretKey = process.env.JWT_SECRET;
    // console.log(secretKey);

    const decodedToken = jwt.verify(token, secretKey as jwt.Secret) as {
      userId: number;
    };
    // console.log(decodedToken);

    const userId = decodedToken.userId;
    // console.log(userId);

    const accountsData = await prisma.account.findMany({
      where: { user_id: userId },
    });

    res.status(200).json(accountsData);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching accounts data.", error });
  }
});

// Add Transaction
app.post("/accounts/:accountId/transactions", async (req, res) => {
  try {
    const { amount, type, budgetCategory, description } = req.body;
    const accountId = parseInt(req.params.accountId);

    // Validate account existence
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      return res.status(404).json({ msg: "Account not found." });
    }

    // Add new transaction in the database
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        budgetCategory,
        description,
        date: new Date(),
        account_id: accountId,
      },
    });
    console.log(newTransaction);

    res.status(201).json(newTransaction); // Return the newly created user
  } catch (error) {
    res.status(500).json({ msg: "Error creating transaction.", error });
  }
});

// Get transactions for an account
app.get("/accounts/:accountId/transactions", async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

    // Fetch transactions for the account
    const transactions = await prisma.transaction.findMany({
      where: { account_id: accountId },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching transactions.", error });
  }
});

app.get("/accounts/:accountId/summary", async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

    const transactions = await prisma.transaction.findMany({
      where: { account_id: accountId },
    });

    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    let totalBalance = 0;
    let totalExpense = 0;
    let totalIncome = 0;
    const numTransactions = transactions.length;

    if (account) {
      totalBalance = account.initial_balance;

      for (const transaction of transactions) {
        if (transaction.type === "Expense") {
          totalExpense += transaction.amount;
          totalBalance -= transaction.amount;
        } else if (transaction.type === "Income") {
          totalIncome += transaction.amount;
          totalBalance += transaction.amount;
        }
      }

      const summary = {
        totalExpense,
        totalIncome,
        totalBalance,
        numTransactions,
      };

      res.status(200).json(summary);
    } else {
      res.status(404).json({ msg: "Account not found." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching summary data.", error });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
