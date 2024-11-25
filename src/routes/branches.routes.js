import { Router } from "express";
import { 
  renderBranchForm, 
  createBranch, 
  getBranches, 
  renderEditBranchForm, 
  updateBranch, 
  deleteBranch 
} from "../controllers/branches.controller.js";

const router = Router();

router.get("/branches", getBranches);  // Mostrar todas las sucursales
router.get("/branches/new", renderBranchForm);  // Formulario para crear una sucursal
router.post("/branches", createBranch);  // Crear una nueva sucursal
router.get("/branches/edit/:id", renderEditBranchForm);  // Formulario para editar una sucursal
router.put("/branches/edit-branch/:id", updateBranch);  // Actualizar una sucursal
router.delete("/branches/delete/:id", deleteBranch);  // Eliminar una sucursal

export default router;