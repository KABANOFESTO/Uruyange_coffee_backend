export interface Payment {
    id?: string; 
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    firstName?: string | null; 
    lastName?: string | null;  
    address: string;
    apartment?: string | null; 
    city: string;
    zipCode: string;
    phone: string;
    textOffers?: boolean; 
    planName: string;
    planPrice: number;
    userId?: string | null; 
    subscriptionId?: string | null; 
    paymentDate?: string; 
    paymentMethod?: string | null; 
    coffeeType?: string | null; 
    roastPreference?: string | null;
}