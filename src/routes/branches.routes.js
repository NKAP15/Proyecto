import { Router } from "express";
import { 
  renderBranchForm, 
  createBranch, 
  getBranches, 
  renderEditBranchForm, 
  updateBranch, 
  deleteBranch 
} from "../controllers/branches.controller.js";

import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/branches", isAuthenticated, getBranches);  // Mostrar todas las sucursales
router.get("/branches/new", isAuthenticated,renderBranchForm);  // Formulario para crear una sucursal
router.post("/branches",isAuthenticated, createBranch);  // Crear una nueva sucursal
router.get("/branches/edit/:id", isAuthenticated,renderEditBranchForm);  // Formulario para editar una sucursal
router.put("/branches/edit-branch/:id",isAuthenticated, updateBranch);  // Actualizar una sucursal
router.delete("/branches/delete/:id", isAuthenticated,deleteBranch);  // Eliminar una sucursal

export default router;