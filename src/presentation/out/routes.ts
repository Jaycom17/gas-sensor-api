import { Router } from "express";
import { HistoryRoutes } from "./history/routes";
import { EmailRoutes } from "./email/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/history", HistoryRoutes.routes);
    router.use("/api/email", EmailRoutes.routes);

    return router;
  }
}
