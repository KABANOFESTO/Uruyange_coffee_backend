"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const subscriptionDTO_1 = __importDefault(require("../DTOs/subscriptionDTO"));
const prisma = new client_1.PrismaClient();
const subscriptionService = {
    createSubscription: async (subscriptionData) => {
        const subscription = await prisma.subscription.create({ data: subscriptionData });
        return subscriptionDTO_1.default.getSubscriptionDTO(subscription);
    },
    getSubscriptions: async () => {
        const subscriptions = await prisma.subscription.findMany();
        return subscriptions.map(subscriptionDTO_1.default.getSubscriptionDTO);
    },
    deleteSubscription: async (id) => {
        await prisma.subscription.delete({ where: { id } });
    },
    updateSubscription: async (id, subscriptionData) => {
        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: subscriptionData
        });
        return subscriptionDTO_1.default.getSubscriptionDTO(updatedSubscription);
    }
};
exports.default = subscriptionService;
//# sourceMappingURL=subscriptionService.js.map