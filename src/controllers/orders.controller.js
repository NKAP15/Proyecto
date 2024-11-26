import Order from "../models/Order.js";
import Provider from "../models/Provider.js";
import Branch from "../models/Branch.js";
import Product from "../models/Product.js";

//formulario para crear una nueva orden
export const renderNewOrderForm = async (req, res) => {
  try {
    const providers = await Provider.find().lean();
    const branches = await Branch.find().lean();
    const products = await Product.find().lean(); // Obtener los productos disponibles
    res.render("orders/new-order", { providers, branches, products });
  } catch (err) {
    console.error(err);
    res.redirect("/orders");
  }
};

//Crear nueva orden
export const createOrder = async (req, res) => {
  const { orderNumber, provider, branch, productId, quantity } = req.body;
  console.log("Datos recibidos:", { orderNumber, provider, branch, productId, quantity });
  try {
    if (!productId || !quantity) {
      throw new Error("El producto o la cantidad no se han proporcionado correctamente.");
    }
    const newOrder = new Order({
      orderNumber,
      provider,
      branch,
      products: [{
        product: productId,
        quantity: quantity
      }],
    });
    await newOrder.save();
    req.flash("success_msg", "Orden creada exitosamente.");
    res.redirect("/orders");

  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error al crear la orden: " + err.message);
    res.redirect("/orders/new");
  }
};

//mostrar todas las ordenes
export const renderOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("provider")
      .populate("branch")
      .populate("products.product")
      .lean();

      orders.forEach(order => {
        order.createdAtFormatted = order.createdAt.toLocaleDateString("es-MX", {
          weekday: "long", // Día de la semana
          year: "numeric", // Año
          month: "long",   // Mes
          day: "numeric" ,  // Día
          hour: "2-digit",  // Hora
          minute: "2-digit", // Minutos
          second: "2-digit", // Segundos
          hour12: false  
        });
      order.canReceive = order.status === "Pending"; // Asumiendo que 'status' es el campo que define si está pendiente
    });
    res.render("orders/all-orders", { orders });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};

// Ver detalles de una orden
export const renderOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("provider")
      .populate("branch")
      .populate("products.product") // Poblar los productos
      .lean();
    if (!order) {
      req.flash("error_msg", "Orden no encontrada.");
      return res.redirect("/orders");
    }
    res.render("orders/order-details", { order });
  } catch (err) {
    console.error(err);
    res.redirect("/orders");
  }
};
