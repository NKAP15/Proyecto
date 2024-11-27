import  Inventory from "../models/Inventory.js";

//Obyener inventario
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate('product') 
      .populate('branch'); 

    res.render('inventory', { inventory });
  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    res.status(500).json({ message: 'Error al obtener el inventario', error: error.message });
  }
};

