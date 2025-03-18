import { Payment as PrismaPayment } from '@prisma/client';
import { Payment } from '../../types/paymentTypes';

export interface PaymentDTO {
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    zipCode: string;
    phone: string;
    textOffers?: boolean;
    planName: string;
    planPrice: number;
    userId: string | null;
    subscriptionId: string | null;
    paymentMethodId: string; // Required, for payment method ID
}

export interface PaymentSummaryDTO {
    id?: string;
    email: string;
    planName: string;
    planPrice: number;
    paymentDate?: string;
    stripePaymentId?: string; // Add this line
    paymentMethodId: string;  // Add this line
}

const createPaymentDTO = (payment: Payment): PaymentDTO => ({
    email: payment.email,
    cardNumber: payment.cardNumber,
    expiryDate: payment.expiryDate,
    cvv: payment.cvv,
    firstName: payment.firstName ?? '',
    lastName: payment.lastName ?? '',
    address: payment.address,
    apartment: payment.apartment ?? undefined,
    city: payment.city,
    zipCode: payment.zipCode,
    phone: payment.phone,
    textOffers: payment.textOffers,
    planName: payment.planName,
    planPrice: payment.planPrice,
    userId: payment.userId ?? null,
    subscriptionId: payment.subscriptionId ?? null,
    paymentMethodId: payment.paymentMethodId,
});

const getPaymentDTO = (payment: PrismaPayment): PaymentSummaryDTO => ({
    id: payment.id,
    email: payment.email,
    planName: payment.planName,
    planPrice: Number(payment.planPrice),
    paymentDate: payment.paymentDate ? payment.paymentDate.toISOString() : undefined,
    stripePaymentId: payment.stripePaymentId ?? undefined,
    paymentMethodId: payment.paymentMethodId,
});

export {
    createPaymentDTO,
    getPaymentDTO,
};