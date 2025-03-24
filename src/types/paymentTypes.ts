export interface Payment {
    id?: string; // Optional for new payments
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    firstName?: string | null; // Optional, allows undefined or null
    lastName?: string | null;  // Optional, allows undefined or null
    address: string;
    apartment?: string | null; // Optional, allows undefined or null
    city: string;
    zipCode: string;
    phone: string;
    textOffers?: boolean; // Optional
    planName: string;
    planPrice: number;
    userId?: string | null; // Optional, allows undefined or null
    subscriptionId?: string | null; // Optional, allows undefined or null
    paymentDate?: string; // Optional
    paymentMethod: string; // Required, for payment method ID
}
