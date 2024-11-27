import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  branch: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Branch", 
    required: true 
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Referencia al producto de inventario
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  customerName: { 
    type: String, 
    required: true 
  },
  patientName: {
    type: String,
    required: false, // Solo si es medicamento controlado
  },
  doctorName: {
    type: String,
    required: false, // Solo si es medicamento controlado
  },
  doctorPhone: {
    type: String,
    required: false, // Solo si es medicamento controlado
  },
  doctorLicense: {
    type: String,
    required: false, // Solo si es medicamento controlado
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sale", SaleSchema);

