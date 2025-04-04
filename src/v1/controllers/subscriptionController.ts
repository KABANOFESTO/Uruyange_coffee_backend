import { Request, Response } from "express";
import subscriptionService from "../services/subscriptionService";
import { prisma } from "../config/database";
import stripe from "../config/stripe.config";

const subscriptionController = {
  createSubscription: async (req: Request, res: Response): Promise<void> => {
    try {
      const subscriptionData = req.body;
      const subscription = await subscriptionService.createSubscription(
        subscriptionData
      );
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Error creating subscription", error });
    }
  },

  getSubscriptions: async (req: Request, res: Response): Promise<void> => {
    try {
      const subscriptions = await subscriptionService.getSubscriptions();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching subscriptions", error });
    }
  },

  deleteSubscription: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await subscriptionService.deleteSubscription(id);
      res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting subscription", error });
    }
  },

  updateSubscription: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const subscriptionData = req.body;
      const updatedSubscription = await subscriptionService.updateSubscription(
        id,
        subscriptionData
      );
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ message: "Error updating subscription", error });
    }
  },

  buySubscription: async (req: Request, res: Response): Promise<any> => {
    try {
      const {
        userId,
        email,
        subscriptionId,
        subscriptionType,
        type,
        price,
        address,
        city,
        zipCode,
        apartment,
      } = req.body;

      // Validate required fields
      if (!userId || !email || !subscriptionId || !price) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Find subscription by name only (since ID lookup is causing issues)
      const subscription = await prisma.subscription.findFirst({
        where: {
          name: subscriptionType?.name
        },
      });

      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate end date based on subscription type
      let endDate = new Date();
      const subscriptionName = subscription.name.toLowerCase();

      if (subscriptionName.includes("weekly")) {
        endDate.setDate(endDate.getDate() + 7);
      } else if (subscriptionName.includes("monthly")) {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (subscriptionName.includes("yearly")) {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      // Create subscription record
      const subscriptionUser = await prisma.subscriptionUser.create({
        data: {
          userId,
          email, // Added email field
          subscriptionId: subscription.id, // Use the found subscription's ID
          type,
          startDate: new Date(),
          endDate,
          status: "PENDING",
          address,
          apartment,
          city,
          zipCode,
        },
      });

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email, // Include email in the Stripe session
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: subscription.name,
                description: `Subscription: ${subscription.name} (${type})`,
              },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          subscriptionUserId: subscriptionUser.id,
          userId: userId,
          subscriptionId: subscription.id,
          type: type,
          email: email, // Store email in metadata for tracking
        },
        success_url: "https://uruyange-coffee-frontend.vercel.app/complete",
        cancel_url: "https://uruyange-coffee-frontend.vercel.app/cancel",
      });

      return res.json({ sessionUrl: session.url });
    } catch (error) {
      console.error("Error buying subscription:", error);
      res.status(500).json({
        message: "Error buying subscription",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  },

  getBoughtSubscription: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      // Get all subscriptions bought by the user with subscription details
      const boughtSubscriptions = await prisma.subscriptionUser.findMany({
        where: {
          userId,
        },
        include: {
          subscription: true, // Include the related subscription details
        },
        orderBy: {
          startDate: 'desc', // Order by most recent first
        },
      });

      res.status(200).json(boughtSubscriptions);
    } catch (error) {
      console.error("Error fetching bought subscriptions:", error);
      res.status(500).json({ message: "Error fetching bought subscriptions", error });
    }
  },
};

export default subscriptionController;
