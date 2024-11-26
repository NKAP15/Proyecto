import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  // Sucursal a la que pertenece este inventario
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },

  // Producto almacenado en la sucursal
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  // Cantidad disponible del producto
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  price: { 
    type: Number, 
    required: true },
  
  // Fecha de caducidad del producto (opcional)
  expirationDate: {
    type: Date,
  },

  // Fecha de la última actualización del inventario
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Inventory", InventorySchema);