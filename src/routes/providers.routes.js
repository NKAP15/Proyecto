import { Router } from 'express';
import { 
  renderProviderForm,
  createNewProvider,
  renderProviders,
  renderEditProviderForm,
  updateProvider,
  deleteProvider
} from '../controllers/providers.controller.js';
import { isAuthenticated,isAdmin } from "../helpers/auth.js";
const router = Router();

router.get('/providers/add', isAuthenticated,isAdmin,renderProviderForm);
router.post('/providers/new-provider', isAuthenticated,isAdmin,createNewProvider);
router.get('/providers',isAuthenticated, renderProviders);
router.get('/providers/edit/:id', isAuthenticated,renderEditProviderForm);
router.put('/providers/edit-provider/:id',isAuthenticated, updateProvider);
router.delete('/providers/delete/:id',isAuthenticated, deleteProvider);

export default router;