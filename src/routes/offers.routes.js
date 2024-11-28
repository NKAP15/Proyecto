import express from 'express';
import {
  createOffer,
  renderOfferForm,
  renderOffers,
  deleteOffer
} from '../controllers/offers.controller.js';
import { isAuthenticated ,isAdmin} from "../helpers/auth.js";
const router = express.Router();

router.get('/offers/new', isAuthenticated,isAdmin,renderOfferForm);
router.post('/offers/new-offer', isAuthenticated,isAdmin,createOffer);
router.get('/offers',isAuthenticated, renderOffers);
router.post('/offers/delete/:id', isAuthenticated,deleteOffer);

export default router;