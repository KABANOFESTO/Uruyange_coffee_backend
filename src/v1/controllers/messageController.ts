import { Request, Response } from 'express';
import messageService from '../services/messageService';
import { apiResponse } from '../utils/apiResponse';

const messageController = {
    createMessage: async (req: Request, res: Response) => {
        const messageData = req.body;
        try {
            const message = await messageService.createMessage(messageData);
            apiResponse.success(res, message, 201);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 400);
        }
    },

    getMessage: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const message = await messageService.getMessageById(id);
            if (!message) return apiResponse.error(res, 'Message not found', 404);
            apiResponse.success(res, message);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 400);
        }
    },

    getAllMessages: async (req: Request, res: Response) => {
        try {
            const messages = await messageService.getAllMessages();
            apiResponse.success(res, messages);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 400);
        }
    },

    updateMessage: async (req: Request, res: Response) => {
        const { id } = req.params;
        const messageData = req.body;
        try {
            const message = await messageService.updateMessage(id, messageData);
            if (!message) return apiResponse.error(res, 'Message not found', 404);
            apiResponse.success(res, message);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 400);
        }
    },

    deleteMessage: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await messageService.deleteMessage(id);
            apiResponse.success(res, { message: 'Message deleted successfully' });
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 400);
        }
    },
};

export default messageController;