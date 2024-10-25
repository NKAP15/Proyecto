import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";

async function main() {
  app.listen(app.get("port"));

  console.log("Servidor en puerto", app.get("port"));
}

main();
