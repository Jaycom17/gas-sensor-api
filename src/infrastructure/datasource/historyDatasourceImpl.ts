import axios from "axios";
import { HistoryDatasource } from "../../domain/datasource/historyDatasource";
import { CustumError } from "../../domain/errors/custum.error";
import { History } from "../../domain/entities/history.entity";
import { Thingspeak } from "../../domain/entities/thingspeakIn";
import { ConvertToRDF } from "../rdf/convertToRDF";
import { Thresholds } from "../../domain/entities/thresholds";
import { ConvertToJS } from "../rdf/convertToJS";
import { EmailRepository } from "../repository/emailRepository";
import { CreateMailBody } from "../notification/createMailBody";
import { TelegramRepository } from "../repository/telegramRepository";
import { CreateTelegramBody } from "../notification/createTelegramBody";

export class HistoryDatasourceImpl extends HistoryDatasource {
  constructor(
    private readonly dataUrl: string,
    private readonly username: string,
    private readonly password: string
  ) {
    super();
  }

  async getHistory(): Promise<History[]> {
    const url = `${this.dataUrl}/sparql`;

    const sparqlQuery = `
      PREFIX history: <http://example.org/history#>

      SELECT ?subject ?predicate ?object
      WHERE {
        ?subject ?predicate ?object.
      }
    `;

    try {
      const response = await axios.post(url, null, {
        params: {
          query: sparqlQuery, // Consulta SPARQL
        },
        headers: {
          Accept: "application/sparql-results+json", // Formato esperado
        },
        auth: {
          username: this.username, // Usuario si lo configuraste
          password: this.password, // Contraseña si lo configuraste
        },
      });

      return ConvertToJS.convertToJS(response.data);

    } catch (error: Error | any) {
      console.error(
        "Error getting data:",
        error.response?.data || error.message
      );
      throw CustumError.internal();
    }
  }

  async saveHistory(
    history: Thingspeak,
    thresholds: Thresholds
  ): Promise<void> {
    const url = `${this.dataUrl}/data`;

    const content = ConvertToRDF.convertToRDF(history, thresholds);

    const emailRepository = new EmailRepository();
    const telegramRepository = new TelegramRepository();

    const email = CreateMailBody.createMailBody("🔥Alerta de gas🔥", {temperature: Number.parseFloat(history.feeds[0]?.field1), gas: Number.parseFloat(history.feeds[0]?.field2), gasThreshold: thresholds.gas, temperatureThreshold: thresholds.temperature});

    const telegram = CreateTelegramBody.createTelegramBody("🔥Alerta de gas🔥", {temperature: Number.parseFloat(history.feeds[0]?.field1), gas: Number.parseFloat(history.feeds[0]?.field2), gasThreshold: thresholds.gas, temperatureThreshold: thresholds.temperature});

    try {

      //emailRepository.sendNotification(email);
      telegramRepository.sendNotification(telegram);

      const res = await axios.post(url, content, {
        headers: { "Content-Type": "text/turtle" },
        auth: { username: this.username, password: this.password },
      });

      if (res.status !== 200) {
        console.error("Error saving data:", res.data);
        throw CustumError.internal();
      }
    } catch (error: Error | any) {
      console.error(
        "Error saving data:",
        error.response?.data || error.message
      );
      throw CustumError.internal();
    }
  }

  async querySparql(query: string): Promise<any> {
    const url = `${this.dataUrl}/sparql`;

    try {
      const response = await axios.post(url, null, {
        params: {
          query,
        },
        headers: {
          Accept: "application/sparql-results+json",
        },
        auth: {
          username: this.username,
          password: this.password,
        },
      });

      return response.data;
    } catch (error: Error | any) {
      console.error(
        "Error querying data:",
        error.response?.data || error.message
      );
      throw CustumError.internal();
    }
  }

}
