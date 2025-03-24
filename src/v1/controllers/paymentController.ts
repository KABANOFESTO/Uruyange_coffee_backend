import { Request, Response } from "express";
import {
  createPayment,
  getPayments,
  proceedPayment,
} from "../services/paymentService";
import { apiResponse } from "../utils/apiResponse";
import stripe from "../config/stripe.config";
import { error } from "console";
import { prisma } from "../config/database";

export const paymentController = {
  createPayment: async (req: Request, res: Response) => {
    const paymentData = req.body;
    try {
      // Ensure createPayment returns a valid object with an ID
      const payment: any = await createPayment(paymentData);

      if (!payment || !payment.data.id) {
        throw new Error("Payment creation failed, missing payment ID");
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: paymentData.planName,
              },
              unit_amount: paymentData.planPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          paymentId: payment.data.id, // Ensure it's valid
          userId: paymentData.userId || "unknown_user", // Default if userId is missing
        },
        success_url: "https://uruyange-coffee-frontend.vercel.app/complete",
        cancel_url: "https://uruyange-coffee-frontend.vercel.app//cancel",
      });

      apiResponse.success(res, { sessionUrl: session.url, payment }, 201);
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

  webhookFunc: async (req: Request, res: Response): Promise<void> => {
    const sig: any = req.headers["stripe-signature"];
    const endpointSecret = process.env.WEBHOOK_SECRET_KEY as string;

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment Intent succeeded:", paymentIntent);

        if (paymentIntent.latest_charge) {
          const charge = await stripe.charges.retrieve(
            paymentIntent.latest_charge
          );

          if (charge.payment_intent) {
            const session = await stripe.checkout.sessions.list({
              payment_intent: charge.payment_intent as string,
              limit: 1,
            });

            if (session.data.length > 0) {
              const checkoutSession = session.data[0];
              const paymentId = checkoutSession.metadata?.paymentId;
              const subscriptionId = checkoutSession.metadata?.subscriptionId;

              try {
                if (subscriptionId) {
                  // If subscriptionId exists, update Subscription status to ACTIVE
                  await prisma.subscriptionUser.update({
                    where: { id: subscriptionId },
                    data: { status: "ACTIVE" },
                  });
                  console.log(`Subscription ${subscriptionId} set to ACTIVE`);
                } else if (paymentId) {
                  // If paymentId exists, update Payment status to PAID
                  await prisma.payment.update({
                    where: { id: paymentId },
                    data: { status: "PAID" },
                  });
                  console.log(`Payment ${paymentId} set to PAID`);
                } else {
                  console.warn(
                    "No paymentId or subscriptionId found in metadata."
                  );
                }
              } catch (error) {
                console.error("Error updating subscription or payment:", error);
              }
            } else {
              console.warn(
                "No Checkout Session found for this Payment Intent."
              );
            }
          }
        }
        break;

      case "payment_intent.failed":
        console.log("Payment Intent failed:", event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  },
};
