"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const client_1 = require("@prisma/client");
const paymentDTO_1 = require("../DTOs/paymentDTO");
const stripe_1 = __importDefault(require("stripe"));
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' });
const createPayment = async (paymentData) => {
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
        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: paymentData.paymentMethodId });
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
            payment: (0, paymentDTO_1.getPaymentDTO)(payment),
            paymentIntent: confirmedPaymentIntent,
        };
    }
    catch (error) {
        console.error('Error creating payment:', error);
        return { success: false, message: 'Payment creation failed', error };
    }
};
exports.createPayment = createPayment;
const getPayments = async () => {
    try {
        const payments = await prisma.payment.findMany();
        if (!payments || payments.length === 0) {
            return { success: false, message: 'No payments found', statusCode: 404 };
        }
        return { success: true, payments: payments.map(paymentDTO_1.getPaymentDTO) };
    }
    catch (error) {
        console.error('Error fetching payments:', error);
        return { success: false, message: 'Failed to retrieve payments', error };
    }
};
exports.getPayments = getPayments;
const getPaymentById = async (id) => {
    try {
        const payment = await prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            return { success: false, message: 'Payment not found', statusCode: 404 };
        }
        return { success: true, payment: (0, paymentDTO_1.getPaymentDTO)(payment) };
    }
    catch (error) {
        console.error('Error fetching payment:', error);
        return { success: false, message: 'Failed to retrieve payment', error };
    }
};
exports.getPaymentById = getPaymentById;
//# sourceMappingURL=paymentService.js.map