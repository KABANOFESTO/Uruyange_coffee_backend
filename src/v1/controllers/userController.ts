import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { apiResponse } from '../utils/apiResponse';

export const userController = {
  createUser: async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    try {
      const user = await userService.createUser(userData);
      apiResponse.success(res, user, 201);
    } catch (error: any) {
      apiResponse.error(res, error.message, 400);
    }
  },

  getUser: async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        apiResponse.error(res, 'User not found', 404);
        return;
      }
      apiResponse.success(res, user);
    } catch (error: any) {
      apiResponse.error(res, error.message, 400);
    }
  },

  getAllUsers: async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      apiResponse.success(res, users);
    } catch (error: any) {
      apiResponse.error(res, error.message, 400);
    }
  },

  loginUser: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const { user, token } = await userService.loginUser(email, password);
      apiResponse.success(res, { user, token });
    } catch (error: any) {
      apiResponse.error(res, error.message, 401);
    }
  },
};
