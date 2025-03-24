import { PrismaClient,} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userDTO from '../DTOs/userDTO';

type UserData = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  user: ReturnType<typeof userDTO.getUserDTO>;
  token: string;
};

const prisma = new PrismaClient();

export const userService = {
  createUser: async (userData: UserData): Promise<ReturnType<typeof userDTO.getUserDTO>> => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword, role: 'user' },
    });
    return userDTO.getUserDTO(user);
  },

  getUserById: async (userId: string): Promise<ReturnType<typeof userDTO.getUserDTO> | null> => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user ? userDTO.getUserDTO(user) : null;
  },

  getAllUsers: async (): Promise<ReturnType<typeof userDTO.getUserDTO>[]> => {
    const users = await prisma.user.findMany();
    return users.map(userDTO.getUserDTO);
  },

  loginUser: async (email: string, password: string): Promise<LoginResponse> => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return { user: userDTO.getUserDTO(user), token };
  },
};
