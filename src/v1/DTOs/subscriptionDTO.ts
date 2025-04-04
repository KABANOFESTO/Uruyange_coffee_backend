export interface Subscription {
    id?: string;
    name: string;
    price: number;
    userId?: string | null;
    email?: string | null; // Added email field
    createdAt?: Date;
}

const SubscriptionDTO = {
    createSubscriptionDTO: (subscription: Subscription) => ({
        name: subscription.name,
        price: subscription.price,
        userId: subscription.userId,
        email: subscription.email, // Added email field
    }),
    getSubscriptionDTO: (subscription: Subscription) => ({
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        createdAt: subscription.createdAt,
        email: subscription.email, // Added email field
    })
};

export default SubscriptionDTO;
