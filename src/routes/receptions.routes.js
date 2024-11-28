// routes/receptions.routes.js
import { Router } from 'express';
import { confirmReceptionFromOrder,
    getReceptions
 } from '../controllers/receptions.controller.js';
 import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.post('/receptions/confirm/:orderId',isAuthenticated, confirmReceptionFromOrder);
router.get ('/receptions',isAuthenticated,getReceptions )

export default router;

