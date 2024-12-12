import { Router } from "express";
import { EmailController } from "./controller";

export class EmailRoutes {
  static get routes(): Router {
    const router = Router();
    const emailController = new EmailController();

    router.get("/:email", emailController.setEmail);

    return router;
  }
}
