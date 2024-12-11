import { Router } from "express";

export class TemperatureRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", (_req, res) => {
        res.send("Hello World");
    });

    return router;
  }
}
