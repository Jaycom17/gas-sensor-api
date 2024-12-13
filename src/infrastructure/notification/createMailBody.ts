import { Content } from "../../domain/entities/content";
import { Reason } from "../rdf/getReason";

interface Data{
    temperature: number;
    gas: number;
    gasThreshold: number;
    temperatureThreshold: number;
}

export class CreateMailBody {
  static createMailBody(subject: string, data: Data): Content {
    const reason = Reason.getReason(
        data.temperature,
        data.gas,
        { temperature: data.temperatureThreshold, gas: data.gasThreshold }
      );
  
      const style = `
        font-family: Arial, sans-serif; 
        line-height: 1.5;
        color: #333;
        max-width: 600px; 
        margin: 0 auto; 
        border: 1px solid #ddd; 
        padding: 20px; 
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      `;
  
      const body = `
        <div style="${style}">
          <h1 style="color: #e63946; text-align: center;">⚠️ Alerta de Seguridad ⚠️</h1>
          <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString()}</p>

          <h2 style="color: #457b9d;">Razón de la alerta:</h2>
          <p>${reason}</p>
  
          <h2 style="color: #457b9d;">Detalles del sensor:</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Temperatura:</strong> ${data.temperature} °C</li>
            <li><strong>Gas:</strong> ${data.gas}</li>
            <li><strong>Umbral de temperatura:</strong> ${data.temperatureThreshold} °C</li>
            <li><strong>Umbral de gas:</strong> ${data.gasThreshold}</li>
          </ul>
  
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
  
          <footer style="text-align: center; font-size: 12px; color: #555;">
            <p>Este mensaje ha sido generado automáticamente por el sistema de monitoreo.</p>
            <p>Por favor, no responda a este correo.</p>
          </footer>
        </div>
      `;
  
      return { subject, body };
  }
}