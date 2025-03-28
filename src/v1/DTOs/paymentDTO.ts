import { Payment as PrismaPayment } from '@prisma/client';
import { Payment } from '../../types/paymentTypes';

export interface PaymentDTO {
    email: string;
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
    paymentMethod: string | null;
    coffeeType?: string | null;
    roastPreference?: string | null;
}

export interface PaymentSummaryDTO {
    id?: string;
    email: string;
    planName: string;
    planPrice: number;
    paymentDate?: string;
    paymentMethod: string;
    coffeeType?: string | null;
    roastPreference?: string | null;
}

const createPaymentDTO = (payment: Payment): PaymentDTO => ({
    email: payment.email,
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
    paymentMethod: payment.paymentMethod ?? '',
    coffeeType: payment.coffeeType ?? undefined,
    roastPreference: payment.roastPreference ?? undefined,
});

const getPaymentDTO = (payment: PrismaPayment): PaymentSummaryDTO => ({
    id: payment.id,
    email: payment.email,
    planName: payment.planName,
    planPrice: Number(payment.planPrice),
    paymentDate: payment.paymentDate ? payment.paymentDate.toISOString() : undefined,
    paymentMethod: payment.paymentMethod ?? 'Unknown',
    coffeeType: payment.coffeeType,
    roastPreference: payment.roastPreference,
});

export {
    createPaymentDTO,
    getPaymentDTO,
};