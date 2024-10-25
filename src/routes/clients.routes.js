import { Router } from "express";
import {
  renderClientForm,
  createNewClient,
  renderClients,
  renderEditClientForm,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js"; 
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/clients/add", isAuthenticated, renderClientForm); 
router.post("/clients/new-client", isAuthenticated, createNewClient); 

router.get("/clients", isAuthenticated, renderClients); 

router.get("/clients/edit/:id", isAuthenticated, renderEditClientForm); 
router.put("/clients/edit-client/:id", isAuthenticated, updateClient); 

router.delete("/clients/delete/:id", isAuthenticated, deleteClient); 

export default router;