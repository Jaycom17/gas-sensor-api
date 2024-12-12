import { Router } from "express";
import { HistoryController } from "./controller";

//TODO: change.
import { envs } from "../../../config/envs";

export class HistoryRoutes {
  static get routes(): Router {
    const router = Router();
    const historyController = new HistoryController();

    router.get("/", historyController.getHistory);

    return router;
  }
}
