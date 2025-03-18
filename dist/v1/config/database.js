"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDB = exports.connectToDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("connected to database");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
const disconnectFromDB = async () => {
    await prisma.$disconnect();
    console.log("disconnected from database");
};
exports.disconnectFromDB = disconnectFromDB;
//# sourceMappingURL=database.js.map