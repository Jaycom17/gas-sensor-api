import { Router } from "express";
import { TemperatureRoutes } from "./out/temperature/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //TODO: Add your routes here
    router.use("/api/temperature", TemperatureRoutes.routes);

    return router;
  }
}
