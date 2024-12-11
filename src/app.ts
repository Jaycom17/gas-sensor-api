import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { JenaDatabase } from "./data/apacheJana";

(() => {
  main();
})();

async function main() {
  //TODO: await database
  const jenaDatabase = new JenaDatabase({username: envs.databaseUser, password: envs.databasePassword, datasetName: envs.databaseName, datasetUrl: envs.databaseUrl});

  await jenaDatabase.checkOrCreateDataset();

  //TODO: start server
  new Server({ port: envs.port, routes: AppRoutes.routes }).start();
}
