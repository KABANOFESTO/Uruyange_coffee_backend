import { PrismaClient } from "@prisma/client";
import SubscriptionDTO from "../DTOs/subscriptionDTO";
import { SubscriptionUser } from "../../types/subscriptionTypes";

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
    },

    // New methods for handling bought subscriptions
    buySubscription: async (subscriptionUserData: {
        userId: string;
        subscriptionId: string;
        type: string;
        email?: string; // Added email field
        address?: string;
        city?: string;
        zipCode?: string;
        apartment?: string;
    }) => {
        // Get subscription details to calculate end date
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionUserData.subscriptionId }
        });

        if (!subscription) {
            throw new Error('Subscription not found');
        }

        // Calculate end date based on subscription duration
        let endDate = new Date();
        if (subscription.name.toLowerCase().includes("week")) {
            endDate.setDate(endDate.getDate() + 7);
        } else if (subscription.name.toLowerCase().includes("month")) {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (subscription.name.toLowerCase().includes("year")) {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        // Create the subscription user record
        const subscriptionUser = await prisma.subscriptionUser.create({
            data: {
                userId: subscriptionUserData.userId,
                subscriptionId: subscriptionUserData.subscriptionId,
                type: subscriptionUserData.type,
                email: subscriptionUserData.email ?? "", // Added email field
                startDate: new Date(),
                endDate,
                status: "PENDING",
                address: subscriptionUserData.address ?? "",
                apartment: subscriptionUserData.apartment,
                city: subscriptionUserData.city ?? "",
                zipCode: subscriptionUserData.zipCode ?? ""
            }
        });

        return subscriptionUser;
    },

    getBoughtSubscriptions: async (userId: string) => {
        const subscriptions = await prisma.subscriptionUser.findMany({
            where: { userId },
            include: {
                subscription: true
            },
            orderBy: {
                startDate: 'desc'
            }
        });
        return subscriptions;
    },

    getSubscriptionUserById: async (id: string) => {
        return await prisma.subscriptionUser.findUnique({
            where: { id },
            include: {
                subscription: true,
                user: {
                    select: {
                        id: true,
                        email: true // Ensures email is included
                    }
                }
            }
        });
    },

    checkActiveSubscription: async (userId: string) => {
        const currentDate = new Date();
        return await prisma.subscriptionUser.findFirst({
            where: {
                userId,
                status: 'ACTIVE',
                endDate: {
                    gte: currentDate
                }
            },
            include: {
                subscription: true
            }
        });
    }
};

export default subscriptionService;
