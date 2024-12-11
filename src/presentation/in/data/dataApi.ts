import axios from "axios";

interface Options {
    dataUrl: string;
}

export class DataApi {
    constructor(private readonly options: Options) {
        this.options = options;
    }

    async getData() {
        try {
            const response = await axios.get(this.options.dataUrl);
            console.log(response.data);
        } catch (error: Error | any) {
            console.error(
                "Error getting data:",
                error.response?.data || error.message
            );
            throw new Error();
        }
    }
}