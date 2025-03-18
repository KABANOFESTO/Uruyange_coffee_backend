import express from 'express';
import { paymentController } from '../controllers/paymentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/payments', authMiddleware, paymentController.createPayment);
router.get('/payments', authMiddleware, paymentController.getPayments);

export default router;