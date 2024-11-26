import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      enum: [
        'Antibiótico',
        'Medicamento en refrigeración',
        'Vitaminas/Suplementos',
        'Medicamento controlado',
        'Medicamento de libre venta',
        'Artículos no medicamento'
      ],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);