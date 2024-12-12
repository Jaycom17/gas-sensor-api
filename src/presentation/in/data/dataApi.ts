import axios from "axios";
import { Thresholds } from "../../../domain/entities/thresholds";
import { DataController } from "./controller";

export class DataApi {
  constructor(
    private readonly dataUrl: string,
    private readonly thresholdsUrl: string,
    private readonly username: string,
    private readonly password: string,
    private readonly SaveDataUrl: string,
    private readonly SaveDataDataset: string
  ) {}

  async getData() {
    try {
      const dataResponse = await axios.get(this.dataUrl);
      const thresholdsResponse = await axios.get(this.thresholdsUrl);

      const thresholds: Thresholds = {
        temperature: thresholdsResponse.data.feeds[0].field1,
        gas: thresholdsResponse.data.feeds[0].field2,
      };

      DataController.getData(
        dataResponse.data,
        thresholds,
        `${this.SaveDataUrl}${this.SaveDataDataset}`,
        this.username,
        this.password
      );
      
    } catch (error: Error | any) {
      console.error(
        "Error getting data:",
        error.response?.data || error.message
      );
      throw new Error();
    }
  }
}
