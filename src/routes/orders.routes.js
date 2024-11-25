// src/routes/orders.routes.js
import { Router } from "express";
import {
  renderNewOrderForm,
  createOrder,
  renderOrders,
  renderOrderDetails,
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/orders", renderOrders); // Listar todas las órdenes
router.get("/orders/new", renderNewOrderForm); // Formulario para nueva orden
router.post("/orders/new", createOrder); // Crear nueva orden
router.get("/orders/:id", renderOrderDetails); // Detalles de una orden
export default router;