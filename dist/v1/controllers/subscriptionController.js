"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionService_1 = __importDefault(require("../services/subscriptionService"));
const subscriptionController = {
    createSubscription: async (req, res) => {
        try {
            const subscriptionData = req.body;
            const subscription = await subscriptionService_1.default.createSubscription(subscriptionData);
            res.status(201).json(subscription);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating subscription', error });
        }
    },
    getSubscriptions: async (req, res) => {
        try {
            const subscriptions = await subscriptionService_1.default.getSubscriptions();
            res.status(200).json(subscriptions);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching subscriptions', error });
        }
    },
    deleteSubscription: async (req, res) => {
        try {
            const { id } = req.params;
            await subscriptionService_1.default.deleteSubscription(id);
            res.status(200).json({ message: 'Subscription deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting subscription', error });
        }
    },
    updateSubscription: async (req, res) => {
        try {
            const { id } = req.params;
            const subscriptionData = req.body;
            const updatedSubscription = await subscriptionService_1.default.updateSubscription(id, subscriptionData);
            res.status(200).json(updatedSubscription);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating subscription', error });
        }
    }
};
exports.default = subscriptionController;
//# sourceMappingURL=subscriptionController.js.map