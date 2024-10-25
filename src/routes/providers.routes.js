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

router.get('/providers/add', renderProviderForm);
router.post('/providers/new-provider', createNewProvider);
router.get('/providers', renderProviders);
router.get('/providers/edit/:id', renderEditProviderForm);
router.put('/providers/edit-provider/:id', updateProvider);
router.delete('/providers/delete/:id', deleteProvider);

export default router;