import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.post('/users/login', userController.loginUser);
router.get('/users', userController.getAllUsers);


export default router;
