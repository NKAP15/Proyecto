import Product from "../models/Product.js";


export const renderProductForm = (req, res) => res.render("products/new-product");

import validator from 'validator';

export const createNewProduct = async (req, res) => {
  const { name, classification } = req.body;
  const errors = [];

  if (!name || !validator.isAlphanumeric(name, 'es-ES', { ignore: ' ' })) {
    errors.push({ text: "Por favor escribe un nombre válido." });
  }

  if (!classification) {
    errors.push({ text: "Por favor escribe una clasificación." });
  }

  if (errors.length > 0)
    return res.render("products/new-product", {
      errors,
      name,
      classification,
    });

  const newProduct = new Product({
    name,
    classification,
    user: req.user.id,
  });

  try {
    await newProduct.save();
    req.flash("success_msg", "Producto agregado exitosamente");
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Hubo un problema al guardar el producto.");
    res.redirect("/products");
  }
};

export const renderProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ date: "desc" })
      .lean();
    res.render("products/all-products", { products });
  } catch (error) {
    console.error(`Error al obtener productos: ${error.message}`);
    res.status(500).send("Error interno del servidor");
  }
};

export const renderEditForm = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();

  res.render("products/edit-product", { product });
};

export const updateProduct = async (req, res) => {
  const { name, classification } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    classification,
  });
  req.flash("success_msg", "Medicamento actualizado con éxito");
  res.redirect("/products");
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Medicamento eliminado exitosamente");
  res.redirect("/products");
};

export const renderProductsByClassification = async (req, res) => {
  const { classification } = req.params; // Obtener la clasificación desde los parámetros de la URL

  try {
    // Buscar productos con la clasificación especificada
    const products = await Product.find({ classification }).lean();
    // Renderizar la vista con los productos filtrados
    res.render("products/all-products", { products, classification });
  } catch (err) {
    console.error(err);
    res.redirect("/products");
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};