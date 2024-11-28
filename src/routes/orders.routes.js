// src/routes/orders.routes.js
import { Router } from "express";
import {
  renderNewOrderForm,
  createOrder,
  renderOrders,
  renderOrderDetails,
} from "../controllers/orders.controller.js";
import { isAuthenticated} from "../helpers/auth.js";
const router = Router();

router.get("/orders",isAuthenticated, renderOrders); // Listar todas las órdenes
router.get("/orders/new", isAuthenticated,renderNewOrderForm); // Formulario para nueva orden
router.post("/orders/new", isAuthenticated,createOrder); // Crear nueva orden
router.get("/orders/:id", isAuthenticated,  renderOrderDetails); // Detalles de una orden
export default router;