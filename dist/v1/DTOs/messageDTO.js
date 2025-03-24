"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageDTO = {
    createMessageDTO: (message) => ({
        name: message.name,
        email: message.email,
        description: message.description,
    }),
    getMessageDTO: (message) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        description: message.description,
        createdAt: message.createdAt,
    }),
};
exports.default = messageDTO;
//# sourceMappingURL=messageDTO.js.map