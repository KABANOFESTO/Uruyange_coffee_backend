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
        subscriptionId,
        type,
        price,
        address,
        city,
        zipCode,
        apartment,
      } = req.body;

      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // 2. Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let endDate = new Date();
      if (subscription.name.toLowerCase().includes("week")) {
        endDate.setDate(endDate.getDate() + 7);
      } else if (subscription.name.toLowerCase().includes("month")) {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (subscription.name.toLowerCase().includes("year")) {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const subscriptionUser = await prisma.subscriptionUser.create({
        data: {
          userId,
          subscriptionId,
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

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: subscription.name,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          subscriptionUserId: subscriptionUser.id,
          userId: userId,
          subscriptionId: subscriptionId,
          type: type,
        },
        success_url: "https://uruyange-coffee-frontend.vercel.app/complete",
        cancel_url: "https://uruyange-coffee-frontend.vercel.app/cancel",
      });
      res.json({ sessionUrl: session.url });
    } catch (error) {
      console.error("Error buying subscription:", error);
      res.status(500).json({ message: "Error buying subscription", error });
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