// routes/sales.routes.js
import express from "express";
import {
  renderSalesForm,
  fetchInventoryByBranch,
  createNewSale,
  renderSales,
  downloadSalePdf,
} from "../controllers/sales.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = express.Router();

router.get("/sales/new",isAuthenticated, renderSalesForm); // Formulario para nueva venta
router.get("/sales/inventory/:branchId", isAuthenticated,fetchInventoryByBranch);
router.post("/sales/new-sale", isAuthenticated,createNewSale); // Crear nueva venta
router.get("/sales",isAuthenticated, renderSales); // Mostrar todas las ventas
router.get("/sales/:id/download",isAuthenticated, downloadSalePdf);
export default router;