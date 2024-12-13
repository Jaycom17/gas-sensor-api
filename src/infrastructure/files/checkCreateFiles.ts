import fs from "fs";
import path from "path";

export class CheckCreateFiles {
  static checkCreateFiles(): void {
    const emailPath = path.join(__dirname, "..", "..", "data", "email.json");
    const notificationPath = path.join(
      __dirname,
      "..",
      "timer",
      "notification.json"
    );

    if (!fs.existsSync(emailPath)) {
      fs.writeFileSync(emailPath, JSON.stringify("", null, 2), "utf8");
    }

    if (!fs.existsSync(notificationPath)) {
      fs.writeFileSync(
        notificationPath,
        JSON.stringify("", null, 2),
        "utf8"
      );
    }
  }
}
