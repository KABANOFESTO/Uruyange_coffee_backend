import { PrismaClient } from '@prisma/client';
import { getPaymentDTO } from '../DTOs/paymentDTO';
import Stripe from 'stripe';
import { Payment } from '../../types/paymentTypes';

type PaymentData = Omit<Payment, 'id' | 'paymentDate' | 'stripePaymentId'>;

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-02-24.acacia' });

export const createPayment = async (paymentData: PaymentData) => {
    try {
        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(paymentData.planPrice * 100), 
            currency: 'usd',
            description: `Payment for ${paymentData.planName}`,
            payment_method_types: ['card', 'blik', 'apple_pay'], 
            metadata: {
                userId: paymentData.userId ?? null,
                subscriptionId: paymentData.subscriptionId ?? null,
            },
        });

        // Confirm the Payment Intent
        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            { payment_method: paymentData.paymentMethodId } 
        );

        // Check if the payment was successful
        if (confirmedPaymentIntent.status !== 'succeeded') {
            throw new Error('Payment failed: Payment Intent not succeeded');
        }

        // Save payment details to the database
        const payment = await prisma.payment.create({
            data: {
                ...paymentData,
                firstName: paymentData.firstName || '',
                lastName: paymentData.lastName || '',
                userId: paymentData.userId ?? null,
                subscriptionId: paymentData.subscriptionId ?? null,
                paymentDate: new Date(),
                stripePaymentId: confirmedPaymentIntent.id,
            },
        });

        return {
            success: true,
            payment: getPaymentDTO(payment),
            paymentIntent: confirmedPaymentIntent,
        };
    } catch (error) {
        console.error('Error creating payment:', error);
        return { success: false, message: 'Payment creation failed', error };
    }
};

export const getPayments = async () => {
    try {
        const payments = await prisma.payment.findMany();
        if (!payments || payments.length === 0) {
            return { success: false, message: 'No payments found', statusCode: 404 };
        }
        return { success: true, payments: payments.map(getPaymentDTO) };
    } catch (error) {
        console.error('Error fetching payments:', error);
        return { success: false, message: 'Failed to retrieve payments', error };
    }
};

export const getPaymentById = async (id: string) => {
    try {
        const payment = await prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            return { success: false, message: 'Payment not found', statusCode: 404 };
        }
        return { success: true, payment: getPaymentDTO(payment) };
    } catch (error) {
        console.error('Error fetching payment:', error);
        return { success: false, message: 'Failed to retrieve payment', error };
    }
};