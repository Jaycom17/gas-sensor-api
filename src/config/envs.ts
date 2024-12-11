import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    port: get('PORT').required().asPortNumber(),
    databaseUrl: get('DATABASE_URL').required().asUrlString(),
    databaseName: get('DATABASE_NAME').required().asString(),
    databaseUser: get('DATABASE_USER').required().asString(),
    databasePassword: get('DATABASE_PASSWORD').required().asString(),
};