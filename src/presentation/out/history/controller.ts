import { Request, Response } from "express";
import { CustumError } from "../../../domain/errors/custum.error";
import { HistoryDatasourceImpl } from "../../../infrastructure/datasource/historyDatasourceImpl";
//TODO: change.
import { envs } from "../../../config/envs";

export class HistoryController {
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustumError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Internal server error" });
  };

  getHistory(_req: Request, res: Response) {
    const historyDatasourceImpl = new HistoryDatasourceImpl(
      `${envs.databaseUrl}${envs.databaseName}`,
      envs.databaseUser,
      envs.databasePassword
    );

    historyDatasourceImpl
      .getHistory()
      .then((history) => {
        res.json(history);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  }

  querySparql(req: Request, res: Response) {
    const historyDatasourceImpl = new HistoryDatasourceImpl(
      `${envs.databaseUrl}${envs.databaseName}`,
      envs.databaseUser,
      envs.databasePassword
    );

    historyDatasourceImpl
      .querySparql(req.body.query)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  }
}
