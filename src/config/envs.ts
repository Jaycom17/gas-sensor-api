import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    port: get('PORT').required().asPortNumber(),
    databaseUrl: get('DATABASE_URL').required().asUrlString(),
    databaseName: get('DATABASE_NAME').required().asString(),
    databaseUser: get('DATABASE_USER').required().asString(),
    databasePassword: get('DATABASE_PASSWORD').required().asString(),
    thingsSpeakUrl: get('THINGSPEAK_URL').required().asUrlString(),
    thresholdsUrl: get('THRESHOLDS_URL').required().asUrlString(),
    audienceId: get('AUDIENCE_ID').required().asString(),
    telegramToken: get('TELEGRAM_BOT_TOKEN').required().asString(),
    email: get('EMAIL').required().asString(),
    emailPassword: get('EMAIL_PASSWORD').required().asString(),
};