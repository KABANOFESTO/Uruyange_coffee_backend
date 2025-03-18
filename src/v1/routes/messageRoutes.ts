import express from 'express';
import messageController from '../controllers/messageController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Public route for creating messages
router.post('/messages', messageController.createMessage);

// Protected routes (require authentication)
router.get('/messages', authMiddleware, messageController.getAllMessages);
router.delete('/messages/:id', authMiddleware, messageController.deleteMessage);

export default router;