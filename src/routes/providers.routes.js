import { Router } from 'express';
import { 
  renderProviderForm,
  createNewProvider,
  renderProviders,
  renderEditProviderForm,
  updateProvider,
  deleteProvider
} from '../controllers/providers.controller.js';
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get('/providers/add', isAuthenticated,renderProviderForm);
router.post('/providers/new-provider', isAuthenticated,createNewProvider);
router.get('/providers',isAuthenticated, renderProviders);
router.get('/providers/edit/:id', isAuthenticated,renderEditProviderForm);
router.put('/providers/edit-provider/:id',isAuthenticated, updateProvider);
router.delete('/providers/delete/:id',isAuthenticated, deleteProvider);

export default router;