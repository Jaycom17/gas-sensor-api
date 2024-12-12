import schedule  from 'node-schedule';
import { DataApi } from '../../presentation/in/data/dataApi';

export class Thingspeak {
    constructor(private readonly thingspeakApi: DataApi) {}

    async getData() {
        try {
            await this.thingspeakApi.getData();
        } catch (error: Error | any) {
            console.error(
                "Error getting data:",
                error.response?.data || error.message
            );
            throw new Error();
        }
    }

    async schedule() {
        schedule.scheduleJob('*/10 * * * * *', async () => {
            await this.getData();
        });
    }
}