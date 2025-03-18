import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const connectToDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectFromDB = async (): Promise<void> => {
  await prisma.$disconnect();
  console.log("disconnected from database");
};

export { prisma, connectToDB, disconnectFromDB };
