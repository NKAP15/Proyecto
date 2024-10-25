import Client from "../models/Client.js"; 

export const renderClientForm = (req, res) => {
  res.render("clients/new-client"); 
};

export const createNewClient = async (req, res) => {
  const { name, phone } = req.body;
  const errors = [];

  if (!name) {
    errors.push({ text: "Por favor escribe un nombre." });
  } 
  if (errors.length > 0) 
    return res.render("clients/new-client", {
      errors,
      name,
    });
  
  const newClient = new Client({ name,phone });
  newClient.user = req.user.id;
  await newClient.save();
  req.flash("success_msg", "Cliente agregado exitosamente");
  res.redirect("/clients");
};

export const renderClients = async (req, res) => {
  const clients = await Client.find() 
    .sort({ createdAt: "asc" }) 
    .lean();
  res.render("clients/all-clients", { clients }); 
};

export const renderEditClientForm = async (req, res) => {
  const client = await Client.findById(req.params.id).lean(); 
  if (!client) {
    req.flash("error_msg", "Cliente no encontrado");
    return res.redirect("/clients");
  }
  res.render("clients/edit-client", { client }); 
};

export const updateClient = async (req, res) => {
  const { name, phone } = req.body;
  await Client.findByIdAndUpdate(req.params.id, { name, phone });
  req.flash("success_msg", "Cliente actualizado con éxito");
  res.redirect("/clients");
};

export const deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id); 
  req.flash("success_msg", "Cliente eliminado exitosamente");
  res.redirect("/clients");
};