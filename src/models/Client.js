// models/Client.js
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

// Crea el modelo Client
export default mongoose.model("Client", ClientSchema);