import { Thingspeak } from "../../../domain/entities/thingspeakIn";
import { Thresholds } from "../../../domain/entities/thresholds";
import { HistoryDatasourceImpl } from "../../../infrastructure/datasource/historyDatasourceImpl";

export class DataController {
    static getData(data: Thingspeak, thresholds: Thresholds, dataUrl:string, username: string, password: string) {
        if (!(Number.parseFloat(data.feeds[0]?.field1) > thresholds.temperature || Number.parseFloat(data.feeds[0]?.field2) > thresholds.gas)) {
            console.log("Data is not above threshold");
        }

        const historyDatasourceImpl = new HistoryDatasourceImpl(dataUrl, username, password);

        try{
            historyDatasourceImpl.saveHistory(data, thresholds);
        }catch (error: Error | any) {
            console.error(
                "Error saving data:",
                error.response?.data || error.message
            );
        }
    }
}