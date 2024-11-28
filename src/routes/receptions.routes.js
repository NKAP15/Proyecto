// routes/receptions.routes.js
import { Router } from 'express';
import { confirmReceptionFromOrder,
    getReceptions
 } from '../controllers/receptions.controller.js';
 import { isAuthenticated,isAdmin } from "../helpers/auth.js";

const router = Router();

router.post('/receptions/confirm/:orderId',isAuthenticated,isAdmin, confirmReceptionFromOrder);
router.get ('/receptions',isAuthenticated,isAdmin,getReceptions )

export default router;

