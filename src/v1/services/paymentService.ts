import { PrismaClient } from "@prisma/client";
import { createPaymentDTO, getPaymentDTO } from "../DTOs/paymentDTO";
import Stripe from "stripe";
import { Payment } from "../../types/paymentTypes";

type PaymentData = Omit<Payment, "id" | "paymentDate" | "stripePaymentId"> & { userId: string, paymentMethodId: string };

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export const createPayment = async (paymentData: PaymentData) => {
  try {
    const completePaymentData = {
      ...paymentData,
      paymentMethod: paymentData.paymentMethod || 'Unknown', // Provide a default if null
    };

    const payment = await prisma.payment.create({
      data: completePaymentData
    });

    if (payment) {
      return { success: true, data: payment };
    }
    return { success: false };
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, message: "Payment creation failed", error };
  }
};

export const getPayments = async () => {
  try {
    const payments = await prisma.payment.findMany();
    if (!payments || payments.length === 0) {
      return { success: false, message: "No payments found", statusCode: 404 };
    }
    return { success: true, payments: payments.map(getPaymentDTO) };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { success: false, message: "Failed to retrieve payments", error };
  }
};

export const getPaymentById = async (id: string) => {
  try {
    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      return { success: false, message: "Payment not found", statusCode: 404 };
    }
    return { success: true, payment: getPaymentDTO(payment) };
  } catch (error) {
    console.error("Error fetching payment:", error);
    return { success: false, message: "Failed to retrieve payment", error };
  }
};

export const proceedPayment = async (data: any) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: data.planName,
            },
            unit_amount: data.planPrice
          },
          quantity: 1
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/complete",
      cancel_url: "http://localhost:3000/complete",
    });

    console.log("session", session)

    return session
  } catch (error) { }
};
