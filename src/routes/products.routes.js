import { Router } from "express";
import {
  renderProductForm,
  createNewProduct,
  renderProducts,
  renderEditForm,
  updateProduct,
  deleteProduct,
  renderProductsByClassification,
  getProductById
} from "../controllers/products.controller.js";
import { isAuthenticated, isAdmin} from "../helpers/auth.js";

const router = Router();

router.get("/products/add", isAuthenticated, isAdmin, renderProductForm);
router.post("/products/new-product", isAuthenticated, createNewProduct);
router.get("/products", isAuthenticated, renderProducts);
router.get("/products/edit/:id", isAuthenticated, renderEditForm);
router.put("/products/edit-product/:id", isAuthenticated, updateProduct);
router.delete("/products/delete/:id", isAuthenticated, deleteProduct);
router.get("/classification/:classification", renderProductsByClassification);
router.get("/products/:id", isAuthenticated, getProductById);
router.get("/products/classification/:classification", isAuthenticated, renderProductsByClassification);
export default router;