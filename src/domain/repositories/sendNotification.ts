import { Content } from "../entities/content";

export abstract class SendNotification {
    abstract sendNotification(content: Content): Promise<void>;
}