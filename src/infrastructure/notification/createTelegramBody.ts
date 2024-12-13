import { Content } from "../../domain/entities/content";
import { Reason } from "../rdf/getReason";

interface Data{
    temperature: number;
    gas: number;
    gasThreshold: number;
    temperatureThreshold: number;
}

export class CreateTelegramBody {
  static createTelegramBody(subject: string, data: Data): Content {
    const reason = Reason.getReason(
        data.temperature,
        data.gas,
        { temperature: data.temperatureThreshold, gas: data.gasThreshold }
      );
      
      const body = `🚨 *Alerta de Seguridad* 🚨\n\n` +
      `*Asunto:* ${subject}\n` +
      `*Temperatura:* ${data.temperature} °C\n` +
      `*Gas:* ${data.gas}\n` +
      `*Umbral de Temperatura:* ${data.temperatureThreshold} °C\n` +
      `*Umbral de Gas:* ${data.gasThreshold}\n` +
      `*Razón de la Alerta:* ${reason}\n\n` +
      `_Mensaje generado automáticamente por el sistema de monitoreo._`;
  
      return { subject, body };
  }
}