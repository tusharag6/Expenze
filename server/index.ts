import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: "kyle", email: "kyle@gmail.com" },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express server is running ...");
});

app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
