import express from "express";
import {
  getInventory,
  returnToSupplier,
  getExpiringSoonInventory 
} from "../controllers/inventory.controller.js";

const router = express.Router();
router.get("/inventory", getInventory);
router.delete('/inventory/delete/:id', returnToSupplier);
router.get('/inventory/expiring-soon', getExpiringSoonInventory);

export default router;