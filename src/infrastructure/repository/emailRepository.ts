import { SendNotification } from "../../domain/repositories/sendNotification";
import { Content } from "../../domain/entities/content";
import { transporter } from "../../config/nodemailer";
import fs from "fs";
import path from "path";
import { envs } from "../../config/envs";

export class EmailRepository extends SendNotification {
  setDestination(email: string): void {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "data", "email.json"),
      JSON.stringify({ email }, null, 2),
      "utf8"
    );
  }

  async sendNotification(email: Content): Promise<void> {
    const emailFile = fs.readFileSync(
      path.join(__dirname, "..", "..", "data", "email.json"),
      "utf8"
    );
    const { email: destination } = JSON.parse(emailFile);

    if (!destination) {
      throw new Error("Destination email not set");
    }

    const mailOptions = {
      from: envs.email,
      to: destination,
      subject: email.subject,
      html: email.body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  }
}
