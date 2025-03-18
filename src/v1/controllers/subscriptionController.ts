import { Request, Response } from 'express';
import subscriptionService from '../services/subscriptionService';

const subscriptionController = {
    createSubscription: async (req: Request, res: Response): Promise<void> => {
        try {
            const subscriptionData = req.body;
            const subscription = await subscriptionService.createSubscription(subscriptionData);
            res.status(201).json(subscription);
        } catch (error) {
            res.status(500).json({ message: 'Error creating subscription', error });
        }
    },
    
    getSubscriptions: async (req: Request, res: Response): Promise<void> => {
        try {
            const subscriptions = await subscriptionService.getSubscriptions();
            res.status(200).json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subscriptions', error });
        }
    },

    deleteSubscription: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await subscriptionService.deleteSubscription(id);
            res.status(200).json({ message: 'Subscription deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting subscription', error });
        }
    },

    updateSubscription: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const subscriptionData = req.body;
            const updatedSubscription = await subscriptionService.updateSubscription(id, subscriptionData);
            res.status(200).json(updatedSubscription);
        } catch (error) {
            res.status(500).json({ message: 'Error updating subscription', error });
        }
    }
};

export default subscriptionController;
