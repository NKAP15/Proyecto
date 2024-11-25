import Branch from "../models/Branch.js";

// Mostrar el formulario para crear una sucursal
export const renderBranchForm = (req, res) => {
  res.render("branches/new-branch");
};

// Crear una nueva sucursal
export const createBranch = async (req, res) => {
  const { name, location } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: "Por favor ingrese un nombre para la sucursal." });
  }
  if (!location) {
    errors.push({ text: "Por favor ingrese una ubicación." });
  }

  if (errors.length > 0) {
    return res.render("branches/new-branch", {
      errors,
      name,
      location,
    });
  }

  const newBranch = new Branch({ name, location });
  await newBranch.save();
  req.flash("success_msg", "Sucursal agregada exitosamente");
  res.redirect("/branches");
};

// Listar todas las sucursales
export const getBranches = async (req, res) => {
  const branches = await Branch.find().lean();
  res.render("branches/all-branches", { branches });
};

// Renderizar el formulario de edición de una sucursal
export const renderEditBranchForm = async (req, res) => {
  const branch = await Branch.findById(req.params.id).lean();
  res.render("branches/edit-branch", { branch });
};

// Actualizar los datos de una sucursal
export const updateBranch = async (req, res) => {
  const { name, location } = req.body;
  await Branch.findByIdAndUpdate(req.params.id, { name, location });
  req.flash("success_msg", "Sucursal actualizada con éxito");
  res.redirect("/branches");
};

// Eliminar una sucursal
export const deleteBranch = async (req, res) => {
  await Branch.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Sucursal eliminada con éxito");
  res.redirect("/branches");
};