import  Inventory from "../models/Inventory.js";
import dayjs from "dayjs";

//Obyener inventario
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate('product')
      .populate('branch');

    res.render('inventory', { inventory, filter: null });
  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    res.status(500).json({ message: 'Error al obtener el inventario', error: error.message });
  }
};
export const getExpiringSoonInventory = async (req, res) => {
  try {
    const sixMonthsFromNow = dayjs().add(6, 'month').toDate();
    const filter = { expirationDate: { $lte: sixMonthsFromNow } };

    const inventory = await Inventory.find(filter)
      .populate('product')
      .populate('branch');

    res.render('inventory', { inventory, filter });
  } catch (error) {
    console.error('Error al obtener los productos por caducar:', error);
    res.status(500).json({ message: 'Error al obtener los productos por caducar', error: error.message });
  }
};
// Manejar regreso a proveedor
export const returnToSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar y eliminar el producto por su ID
    const deletedProduct = await Inventory.findByIdAndDelete(id);

    if (!deletedProduct) {
      req.flash('error_msg', 'Producto no encontrado.');
      return res.redirect('/inventory');
    }
    req.flash('success_msg', 'Producto regresado al proveedor y eliminado del inventario.');
    res.redirect('/inventory');
  } catch (error) {
    console.error('Error al regresar producto al proveedor:', error);
    req.flash('error_msg', 'Ocurrió un error al intentar regresar el producto al proveedor.');
    res.redirect('/inventory');
  }
};
