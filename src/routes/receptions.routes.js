// routes/receptions.routes.js
import { Router } from 'express';
import { confirmReceptionFromOrder,
    getReceptions
 } from '../controllers/receptions.controller.js';

const router = Router();

router.post('/receptions/confirm/:orderId', confirmReceptionFromOrder);
router.get ('/receptions',getReceptions )

export default router;

