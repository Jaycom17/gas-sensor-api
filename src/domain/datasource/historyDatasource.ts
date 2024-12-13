import { History } from "../entities/history.entity";
import { Thingspeak } from "../entities/thingspeakIn";
import { Thresholds } from "../entities/thresholds";

export abstract class HistoryDatasource {
  abstract getHistory(): Promise<History[]>;
  abstract saveHistory(history: Thingspeak, thresholds: Thresholds): Promise<void>;
  abstract querySparql(query: string): Promise<any>;
}
