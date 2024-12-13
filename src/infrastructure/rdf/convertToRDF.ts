import { Thingspeak } from "../../domain/entities/thingspeakIn";
import { Thresholds } from "../../domain/entities/thresholds";
import { Reason } from "./getReason";
import { v4 } from "uuid";

export class ConvertToRDF {
  public static convertToRDF(history: Thingspeak, thresholds: Thresholds): string {
    const id = v4();

    const reason = Reason.getReason(Number.parseFloat(history.feeds[0]?.field1), Number.parseFloat(history.feeds[0]?.field1), thresholds);

    return `
        <http://example.org/history/${id}> <http://example.org/history#id> "${id}" .
        <http://example.org/history/${id}> <http://example.org/history#date> "${new Date().toLocaleString()}" .
        <http://example.org/history/${id}> <http://example.org/history#temperature> "${
      history.feeds[0]?.field1
    }" .
        <http://example.org/history/${id}> <http://example.org/history#gas> "${
      history.feeds[0]?.field2
    }" .
        <http://example.org/history/${id}> <http://example.org/history#reason> "${reason}" .
            `.trim();
  }
}
