import { Events } from "./events";
import { Payment } from "./payment";

export class EventWithPayment {
    event: Events;
    payment: Payment;
}