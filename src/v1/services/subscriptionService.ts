import { PrismaClient } from "@prisma/client";
import SubscriptionDTO from "../DTOs/subscriptionDTO";

const prisma = new PrismaClient();

const subscriptionService = {
    createSubscription: async (subscriptionData: any) => {
        const subscription = await prisma.subscription.create({ data: subscriptionData });
        return SubscriptionDTO.getSubscriptionDTO(subscription);
    },

    getSubscriptions: async () => {
        const subscriptions = await prisma.subscription.findMany();
        return subscriptions.map(SubscriptionDTO.getSubscriptionDTO);
    },

    deleteSubscription: async (id: string): Promise<void> => {
        await prisma.subscription.delete({ where: { id } });
    },

    updateSubscription: async (id: string, subscriptionData: any) => {
        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: subscriptionData
        });
        return SubscriptionDTO.getSubscriptionDTO(updatedSubscription);
    }
};

export default subscriptionService;
