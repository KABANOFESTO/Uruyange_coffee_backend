import { PrismaClient } from '@prisma/client';
import { CreateMessageDTO, MessageDTO } from '../DTOs/messageDTO';

const prismaClient = new PrismaClient();

const toMessageDTO = (message: any): MessageDTO => {
    return {
        id: message.id,
        name: message.name,
        email: message.email,
        description: message.description,
        createdAt: message.createdAt
    };
};

const messageService = {
    createMessage: async (messageData: CreateMessageDTO): Promise<MessageDTO> => {
        const message = await prismaClient.message.create({
            data: messageData,
        });
        return toMessageDTO(message);
    },

    getAllMessages: async (): Promise<MessageDTO[]> => {
        const messages = await prismaClient.message.findMany();
        return messages.map(toMessageDTO);
    },

    getMessageById: async (id: string): Promise<MessageDTO | null> => {
        const message = await prismaClient.message.findUnique({
            where: { id }
        });
        return message ? toMessageDTO(message) : null;
    },

    deleteMessage: async (id: string): Promise<void> => {
        await prismaClient.message.delete({ where: { id } });
    },

    updateMessage: async (id: string, messageData: Partial<CreateMessageDTO>): Promise<MessageDTO> => {
        const updatedMessage = await prismaClient.message.update({
            where: { id },
            data: messageData,
        });
        return toMessageDTO(updatedMessage);
    }
};

export default messageService;