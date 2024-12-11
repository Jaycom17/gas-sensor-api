import axios from "axios";

interface Options {
  username: string;
  password: string;
  datasetName: string;
  datasetUrl: string;
}

export class JenaDatabase {
  constructor(private readonly options: Options) {
    this.options = options;
    this.options.datasetUrl = `${this.options.datasetUrl}$/datasets`;
  }

  async checkOrCreateDataset() {

    try {
      const response = await axios.get(this.options.datasetUrl, {
        auth: { username: this.options.username, password: this.options.password },
      });

      const datasets = response.data.datasets.map(
        (ds: Object | any) => ds["ds.name"]
      );

      if (datasets.includes(`/${this.options.datasetName}`)) {
        console.log(`Dataset '${this.options.datasetName}' already exists.`);
      } else {
        console.log(`Dataset '${this.options.datasetName}' doesn't exists. Creating...`);
        await this.createDataset();
      }
    } catch (error: Error | any) {
      console.error(
        "Error checking datasets:",
        error.response?.data || error.message
      );
      throw new Error();
    }
  }

  async createDataset() {
    const data = {
      dbName: this.options.datasetName,
      dbType: "tdb2",
    };

    try {
      const response = await axios.post(this.options.datasetUrl, null, {
        params: data,
        auth: { username: "admin", password: "admin123" },
      });

      if (response.status !== 200) {
        throw new Error(
          `Error creating dataset. Status code: ${response.status}`
        );
      }

      console.log(`Dataset '${this.options.datasetName}' created.`);
    } catch (error: Error | any) {
      console.error(
        "Error creating dataset:",
        error.response?.data || error.message
      );
      throw new Error();
    }
  }
}
