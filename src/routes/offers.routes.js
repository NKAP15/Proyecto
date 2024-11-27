import express from 'express';
import {
  createOffer,
  renderOfferForm,
  renderOffers,
  deleteOffer
} from '../controllers/offers.controller.js';

const router = express.Router();

// Ruta para mostrar el formulario de creación de oferta
router.get('/offers/new', renderOfferForm);
// Ruta para crear una nueva oferta
router.post('/offers/new-offer', createOffer);
// Ruta para mostrar todas las ofertas
router.get('/offers', renderOffers);
// Ruta para eliminar una oferta
router.post('/offers/delete/:id', deleteOffer);

export default router;