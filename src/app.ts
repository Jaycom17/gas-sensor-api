import { envs } from "./config/envs";
import { Server } from "./presentation/out/server";
import { AppRoutes } from "./presentation/out/routes";
import { JenaDatabase } from "./data/apacheJana/apacheJanaDatabase";
import { DataApi } from "./presentation/in/data/dataApi";
import { Thingspeak } from "./data/thingspeak/thingspeak";

(() => {
  main();
})();

async function main() {
  //Database
  const jenaDatabase = new JenaDatabase({
    username: envs.databaseUser,
    password: envs.databasePassword,
    datasetName: envs.databaseName,
    datasetUrl: envs.databaseUrl,
  });

  await jenaDatabase.checkOrCreateDataset();

  //Get data from thingspeak
  const dataApi = new DataApi(
    envs.thingsSpeakUrl,
    envs.thresholdsUrl,
    envs.databaseUser,
    envs.databasePassword,
    envs.databaseUrl,
    envs.databaseName
  );

  //Schedule
  const thingspeak = new Thingspeak(dataApi);
  thingspeak.schedule();

  //start server
  new Server({ port: envs.port, routes: AppRoutes.routes }).start();
}
