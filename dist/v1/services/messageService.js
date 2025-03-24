"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
const toMessageDTO = (message) => {
    return {
        id: message.id,
        name: message.name,
        email: message.email,
        description: message.description,
        createdAt: message.createdAt
    };
};
const messageService = {
    createMessage: async (messageData) => {
        const message = await prismaClient.message.create({
            data: messageData,
        });
        return toMessageDTO(message);
    },
    getAllMessages: async () => {
        const messages = await prismaClient.message.findMany();
        return messages.map(toMessageDTO);
    },
    getMessageById: async (id) => {
        const message = await prismaClient.message.findUnique({
            where: { id }
        });
        return message ? toMessageDTO(message) : null;
    },
    deleteMessage: async (id) => {
        await prismaClient.message.delete({ where: { id } });
    },
    updateMessage: async (id, messageData) => {
        const updatedMessage = await prismaClient.message.update({
            where: { id },
            data: messageData,
        });
        return toMessageDTO(updatedMessage);
    }
};
exports.default = messageService;
//# sourceMappingURL=messageService.js.map