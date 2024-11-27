// routes/sales.routes.js
import express from "express";
import {
  renderSalesForm,
  fetchInventoryByBranch,
  createNewSale,
  renderSales,
  downloadSalePdf,
} from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/sales/new", renderSalesForm); // Formulario para nueva venta
router.get("/sales/inventory/:branchId", fetchInventoryByBranch);
router.post("/sales/new-sale", createNewSale); // Crear nueva venta
router.get("/sales", renderSales); // Mostrar todas las ventas
router.get("/sales/:id/download", downloadSalePdf);
export default router;