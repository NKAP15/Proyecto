import Order from '../models/Order.js';
import Reception from '../models/Reception.js';
import Inventory from '../models/Inventory.js';


//Confirmar orden
export const confirmReceptionFromOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { price, expirationDate } = req.body;
    console.log('ID de la orden recibido:', orderId);
    // Buscar la orden con datos de productos y sucursal
    const order = await Order.findById(orderId)
      .populate('branch')
      .populate('products.product'); 
      if (!order) {
        console.error(`Orden con ID ${orderId} no encontrada.`);
        return res.status(404).json({ message: `Orden con ID ${orderId} no encontrada.` });
      }
    
      console.log('Orden encontrada:', JSON.stringify(order, null, 2)); // Esto imprimirá la orden completa
     console.log('Detalles de los productos:', JSON.stringify(order.products, null, 2));
  
      if (!order.branch) {
        console.error('La orden no tiene sucursal asignada.');
        return res.status(400).json({ message: 'La orden no tiene sucursal asignada.' });
      }

    // Crear una nueva recepción
    const reception = new Reception({
      order: orderId,
      branch: order.branch._id, 
      productsReceived: order.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: parseFloat(price),
        expirationDate: new Date(expirationDate),
      })),
    });
    await reception.save();

    // Crear o actualizar inventario para cada producto de la orden
    const inventoryUpdates = order.products.map(async (item) => {
      if (!item.product) {
        console.error('Producto no definido en la orden:', item);
        throw new Error('Producto no definido en la orden.');
      }

      // Buscar si ya existe en el inventario
      const existingInventory = await Inventory.findOne({
        product: item.product._id,
        branch: order.branch._id,
        expirationDate: new Date(expirationDate),
      });

      if (existingInventory) {
        // Actualizar cantidad y precio si ya existe
        existingInventory.quantity += item.quantity;
        existingInventory.price = parseFloat(price); 
        await existingInventory.save();
      } else {
        // Crear nuevo registro en el inventario
        const newInventory = new Inventory({
          product: item.product._id,
          branch: order.branch._id,
          quantity: item.quantity,
          price: parseFloat(price),
          expirationDate: new Date(expirationDate),
        });
        await newInventory.save();
      }
    });
    await Promise.all(inventoryUpdates);
    req.flash('success_msg', 'Recepción exitosa, se almacenaron los productos correctamente');
    res.redirect('/receptions');
  } catch (error) {
    console.error('Error al confirmar la recepción:', error);
    res.status(500).json({ message: 'Error al confirmar la recepción.', error: error.message });
  }
};

//Obtener las recepciones 
export const getReceptions = async (req, res) => {
  try {
    const receptions = await Reception.find()
      .populate('order') 
      .populate('branch')
      .populate('productsReceived.product') 
    res.render('receptions', { receptions });
  } catch (error) {
    console.error('Error al obtener las recepciones:', error);
    res.status(500).json({ message: 'Error al obtener las recepciones', error: error.message });
  }
};