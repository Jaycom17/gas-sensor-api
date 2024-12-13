import { Timer } from "./timer";
import fs from "fs";
import path from "path";

export class LastNotification {
  static checkLastNotification(Notification: Date): boolean {

    const notificationFile = fs.readFileSync(
      path.join(__dirname, "notification.json"),
      "utf8"
    );

    if (!notificationFile) {
      fs.writeFileSync(
        path.join(__dirname, "notification.json"),
        JSON.stringify({ lastNotification: Notification }, null, 2),
        "utf8"
      );
      return true;
    }

    const { lastNotification } = JSON.parse(notificationFile);

    if (!lastNotification) {
      fs.writeFileSync(
        path.join(__dirname, "notification.json"),
        JSON.stringify({ lastNotification: Notification }, null, 2),
        "utf8"
      );
      return true;
    }

    const lastNotificationDate = new Date(lastNotification);

    if (Timer.hasTenMinutesPassed(Notification, lastNotificationDate)) {
      fs.writeFileSync(
        path.join(__dirname, "notification.json"),
        JSON.stringify({ lastNotification: Notification }, null, 2),
        "utf8"
      );
      return true;
    }

    return false;
  }
}
