import { Router } from "express";
import { HistoryController } from "./controller";

export class HistoryRoutes {
  static get routes(): Router {
    const router = Router();
    const historyController = new HistoryController();

    router.get("/", historyController.getHistory);
    router.post("/query", historyController.querySparql);

    return router;
  }
}
