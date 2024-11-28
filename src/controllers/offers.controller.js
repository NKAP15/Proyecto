import Offer from '../models/Offer.js';
import Product from '../models/Product.js';
import Inventory from '../models/Inventory.js';

// Crear una nueva oferta
export const createOffer = async (req, res) => {
  try {
    const { productId, discount, startDate, endDate, employeeCommission } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      req.flash('error_msg', 'Producto no encontrado');
      return res.redirect('/offers');
    }

    // Crear oferta
    const newOffer = new Offer({
      productId,
      discount,
      startDate,
      endDate,
      employeeCommission: product.classification === 'Vitaminas/Suplementos' ? employeeCommission : undefined,
    });

    await newOffer.save();
    req.flash('success_msg', 'Oferta creada exitosamente');
    res.redirect('/offers');
  } catch (error) {
    req.flash('error_msg', `Error al crear la oferta: ${error.message}`);
    return res.redirect('/offers');
  }
};

export const renderOffers = async (req, res) => {
    try {
      // Obtener todas las ofertas sin filtrar por fechas
      const offers = await Offer.find()
      .populate('productId', 'name');
  
      // Renderizar la vista de todas las ofertas con los datos obtenidos
      res.render('offers/all-offers', { offers });
    } catch (error) {
      req.flash('error_msg', `Error al listar las ofertas: ${error.message}`);
      return res.redirect('/offers');
    }
  };


export const renderOfferForm = async (req, res) => {
  try {
    // Obtén todos los productos de la colección de inventario
    const products = await Inventory.find()
    .populate('product', 'name price');
    res.render('offers/new-offer', { products });
  } catch (error) {
    req.flash('error_msg', `Error al obtener productos del inventario: ${error.message}`);
    return res.redirect('/offers');
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).send({ message: 'Oferta no encontrada' });
    }
    await Offer.findByIdAndDelete(id);
    req.flash('success_msg', 'Oferta eliminada exitosamente');
    res.redirect('/offers');
  } catch (error) {
    req.flash('error_msg', `Error al eliminar la oferta: ${error.message}`);
    return res.redirect('/offers');
  }
};