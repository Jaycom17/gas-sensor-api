import { Email } from "../entities/email";

export abstract class SendEmail {
    abstract sendEmail(email: Email): Promise<void>;
    abstract setDestination(email: string): void;
}