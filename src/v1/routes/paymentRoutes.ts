import express from 'express';
import { paymentController } from '../controllers/paymentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/payments', authMiddleware, paymentController.createPayment);
router.get('/payments', authMiddleware, paymentController.getPayments);
router.post(
    "/webhook",
    express.raw({ type: 'application/json' }),
    paymentController.webhookFunc
  );


export default router;