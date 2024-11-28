import express from "express";
import {
  getInventory,
  returnToSupplier,
  getExpiringSoonInventory 
} from "../controllers/inventory.controller.js";

import { isAuthenticated } from "../helpers/auth.js";

const router = express.Router();
router.get("/inventory", isAuthenticated, getInventory);
router.delete('/inventory/delete/:id',  isAuthenticated,returnToSupplier);
router.get('/inventory/expiring-soon', isAuthenticated, getExpiringSoonInventory);

export default router;