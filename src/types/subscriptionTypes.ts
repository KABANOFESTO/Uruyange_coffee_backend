export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // 'week', 'month', 'year'
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionUser {
  id: string;
  userId: string;
  subscriptionId: string;
  type: string; // e.g., 'MONTHLY', 'YEARLY'
  startDate: Date;
  endDate: Date;
  status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAUSED';
  address?: string;
  apartment?: string;
  city?: string;
  zipCode?: string;
  email?: string; // Added email field
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionWithUser extends SubscriptionUser {
  subscription: Subscription;
  user?: {
      id: string;
      name: string;
      email: string;
  };
}

export interface CreateSubscriptionInput {
  name: string;
  description: string;
  price: number;
  duration: string;
  benefits: string[];
}

export interface UpdateSubscriptionInput {
  name?: string;
  description?: string;
  price?: number;
  duration?: string;
  benefits?: string[];
}

export interface BuySubscriptionInput {
  userId: string;
  subscriptionId: string;
  type: string;
  price: number;
  address?: string;
  city?: string;
  zipCode?: string;
  apartment?: string;
}

export interface SubscriptionStatusUpdate {
  subscriptionUserId: string;
  status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAUSED';
}

// For frontend display
export interface UserSubscription {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  startDate: Date;
  endDate: Date;
  remainingDays: number;
  benefits: string[];
}
