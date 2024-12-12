import { SendEmail } from "../../domain/repositories/sendEmail";
import { Email } from "../../domain/entities/email";
import {resend} from "../../config/resend";
import fs from "fs";
import path from "path";

export class EmailRepository extends SendEmail {
  setDestination(email: string): void {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "data", "email.json"),
      JSON.stringify({ email }, null, 2),
      "utf8"
    );
  }

  async sendEmail(email: Email): Promise<void> {
    const emailFile = fs.readFileSync(
      path.join(__dirname, "..", "..", "data", "email.json"),
      "utf8"
    );
    const { email: destination } = JSON.parse(emailFile);

    if (!destination) {
      throw new Error("Destination email not set");
    }

    resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [destination],
      subject: email.subject,
      html: email.body,
    }).then(() => {
      console.log("Email sent");
    }).catch((error: Error) => {
        console.error("Error sending email:", error.message);
    });
  }
}