import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
mongoose.set('strictQuery', true);
try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Crud conectada a la base de datos", db.connection.name);
} catch (error) {
  console.error(error);
}

mongoose.connection.on("connected", () => {
  console.log("Mongodb esta conectado");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb esta desconectado");
});


