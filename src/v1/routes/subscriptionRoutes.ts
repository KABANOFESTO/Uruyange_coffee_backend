import express from 'express';
import subscriptionController from '../controllers/subscriptionController';
const router = express.Router();

router.post('/subscriptions', subscriptionController.createSubscription);
router.get('/subscriptions', subscriptionController.getSubscriptions);
router.get('/suscriptionUser', subscriptionController.getBoughtSubscription);
router.delete('/subscriptions/:id', subscriptionController.deleteSubscription);
router.put('/subscriptions/:id', subscriptionController.updateSubscription);
router.post('/buySubscription', subscriptionController.buySubscription);

export default router;