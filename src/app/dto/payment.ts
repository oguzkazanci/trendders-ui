export class Payment {
    paymentId: number;
    eventId: number;
    paymentDate: string;
    paymentStatus: number;
    paymentAmount: number;
    amountReceived: number;
    remainingAmount: number;
    paymentQuantity: number;
    paymentMethodId: number;
    paymentType: number;
    payBack: number;
    repeatInterval: number = 0;
    explanation: string;
}