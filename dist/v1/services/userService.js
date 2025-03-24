"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDTO_1 = __importDefault(require("../DTOs/userDTO"));
const prisma = new client_1.PrismaClient();
exports.userService = {
    createUser: async (userData) => {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const user = await prisma.user.create({
            data: { ...userData, password: hashedPassword, role: 'user' },
        });
        return userDTO_1.default.getUserDTO(user);
    },
    getUserById: async (userId) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user ? userDTO_1.default.getUserDTO(user) : null;
    },
    getAllUsers: async () => {
        const users = await prisma.user.findMany();
        return users.map(userDTO_1.default.getUserDTO);
    },
    loginUser: async (email, password) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error('User not found');
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw new Error('Invalid password');
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user: userDTO_1.default.getUserDTO(user), token };
    },
};
//# sourceMappingURL=userService.js.map