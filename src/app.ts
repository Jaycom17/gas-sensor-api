import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(() => {
  main();
})();

async function main() {
  //TODO: await database

  //TODO: start server
  new Server({ port: envs.port, routes: AppRoutes.routes }).start();
}
