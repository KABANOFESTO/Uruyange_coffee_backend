"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageService_1 = __importDefault(require("../services/messageService"));
const apiResponse_1 = require("../utils/apiResponse");
const messageController = {
    createMessage: async (req, res) => {
        const messageData = req.body;
        try {
            const message = await messageService_1.default.createMessage(messageData);
            apiResponse_1.apiResponse.success(res, message, 201);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    getMessage: async (req, res) => {
        const { id } = req.params;
        try {
            const message = await messageService_1.default.getMessageById(id);
            if (!message)
                return apiResponse_1.apiResponse.error(res, 'Message not found', 404);
            apiResponse_1.apiResponse.success(res, message);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    getAllMessages: async (req, res) => {
        try {
            const messages = await messageService_1.default.getAllMessages();
            apiResponse_1.apiResponse.success(res, messages);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    updateMessage: async (req, res) => {
        const { id } = req.params;
        const messageData = req.body;
        try {
            const message = await messageService_1.default.updateMessage(id, messageData);
            if (!message)
                return apiResponse_1.apiResponse.error(res, 'Message not found', 404);
            apiResponse_1.apiResponse.success(res, message);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
    deleteMessage: async (req, res) => {
        const { id } = req.params;
        try {
            await messageService_1.default.deleteMessage(id);
            apiResponse_1.apiResponse.success(res, { message: 'Message deleted successfully' });
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 400);
        }
    },
};
exports.default = messageController;
//# sourceMappingURL=messageController.js.map