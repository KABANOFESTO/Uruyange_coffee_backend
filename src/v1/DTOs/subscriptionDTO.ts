export interface Subscription {
    id?: string;
    name: string;
    price: number;
    userId?: string | null;
    createdAt?: Date;
}

const SubscriptionDTO = {
    createSubscriptionDTO: (subscription: Subscription) => ({
        name: subscription.name,
        price: subscription.price,
        userId: subscription.userId,
    }),
    getSubscriptionDTO: (subscription: Subscription) => ({
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        createdAt: subscription.createdAt,
    })
};

export default SubscriptionDTO;
