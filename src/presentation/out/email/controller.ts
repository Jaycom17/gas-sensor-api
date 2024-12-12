import { Request, Response } from "express";
import { CustumError } from "../../../domain/errors/custum.error";
import { EmailRepository } from "../../../infrastructure/repository/emailRepository";

export class EmailController {

  setEmail(req: Request, res: Response) {
    const emailRepository = new EmailRepository();
    emailRepository.setDestination(req.params.email);

    res.json({ message: "Email set" });
  }
}
