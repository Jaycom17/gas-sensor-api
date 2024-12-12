import { Thresholds } from "../../domain/entities/thresholds";

export class Reason {
    static getReason(temperature: number, gas: number, thresholds: Thresholds): string {
        if (temperature > thresholds.temperature && gas > thresholds.gas) {
            return 'La temperatura y los niveles de gas superaron los umbrales establecidos';
        } else if (temperature > thresholds.temperature) {
            return 'La temperatura superó los umbrales establecidos';
        } else if (gas > thresholds.gas) {
            return 'Los niveles de gas superaron los umbrales establecidos';
        } else {
            return 'Normal';
        }
    }
}