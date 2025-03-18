export interface CreateMessageDTO {
    name: string;
    email: string;
    description: string;
}

export interface MessageDTO {
    id: string;
    name: string;
    email: string;
    description: string;
    createdAt: Date;
}

const messageDTO = {
    createMessageDTO: (message: CreateMessageDTO) => ({
        name: message.name,
        email: message.email,
        description: message.description,
    }),
    getMessageDTO: (message: MessageDTO) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        description: message.description,
        createdAt: message.createdAt,
    }),
};

export default messageDTO;