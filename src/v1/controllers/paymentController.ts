import { Request, Response } from 'express';
import { createPayment, getPayments } from '../services/paymentService';
import { apiResponse } from '../utils/apiResponse';

export const paymentController = {
    createPayment: async (req: Request, res: Response) => {
        const paymentData = req.body;
        try {
            const payment = await createPayment(paymentData);
            apiResponse.success(res, payment, 201);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 500);
        }
    },

    getPayments: async (req: Request, res: Response) => {
        try {
            const payments = await getPayments();
            apiResponse.success(res, payments);
        } catch (error) {
            apiResponse.error(res, (error as Error).message, 500);
        }
    },
};