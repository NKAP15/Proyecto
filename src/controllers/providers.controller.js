import Provider from "../models/Provider.js"; 

export const renderProviderForm = (req, res) => {
  res.render("providers/new-provider"); 
};

export const createNewProvider = async (req, res) => {
  const { name, phone } = req.body;
  const errors = [];

  if (!name) errors.push({ text: "Por favor escribe un nombre." });
  if (!phone) errors.push({ text: "Por favor escribe un teléfono." });

  if (errors.length > 0) 
    return res.render("providers/new-provider", { errors, name, phone });

  const newProvider = new Provider({ name, phone });
  await newProvider.save();
  req.flash("success_msg", "Proveedor agregado exitosamente");
  res.redirect("/providers");
};

export const renderProviders = async (req, res) => {
  const providers = await Provider.find().sort({ createdAt: "asc" }).lean();
  res.render("providers/all-providers", { providers });
};

export const renderEditProviderForm = async (req, res) => {
  const provider = await Provider.findById(req.params.id).lean(); 
  if (!provider) {
    req.flash("error_msg", "Proveedor no encontrado");
    return res.redirect("/providers");
  }
  res.render("providers/edit-provider", { provider }); 
};

export const updateProvider = async (req, res) => {
  const { name, phone } = req.body;
  await Provider.findByIdAndUpdate(req.params.id, { name, phone});
  req.flash("success_msg", "Proveedor actualizado con éxito");
  res.redirect("/providers");
};

export const deleteProvider = async (req, res) => {
  await Provider.findByIdAndDelete(req.params.id); 
  req.flash("success_msg", "Proveedor eliminado exitosamente");
  res.redirect("/providers");
};