"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SubscriptionDTO = {
    createSubscriptionDTO: (subscription) => ({
        name: subscription.name,
        price: subscription.price,
        userId: subscription.userId,
    }),
    getSubscriptionDTO: (subscription) => ({
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        createdAt: subscription.createdAt,
    })
};
exports.default = SubscriptionDTO;
//# sourceMappingURL=subscriptionDTO.js.map