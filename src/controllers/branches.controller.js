import Branch from "../models/Branch.js";
import Order from "../models/Order.js"; 

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

  try {
    // Verificar si la sucursal existe
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      req.flash("error_msg", "Sucursal no encontrada");
      return res.redirect("/branches");
    }

    // Actualizar la sucursal
    const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, { name, location }, { new: true });

    if (!updatedBranch) {
      req.flash("error_msg", "No se pudo actualizar la sucursal");
      return res.redirect("/branches");
    }

    // Actualizar las órdenes solo si los datos de la sucursal han cambiado
    await Order.updateMany(
      { branchId: req.params.id },
      { $set: { branchName: name, branchLocation: location } }
    );

    req.flash("success_msg", "Sucursal actualizada con éxito");
    res.redirect("/branches");
  } catch (error) {
    console.error(error);
    res.redirect("/branches");
  }
};

// Eliminar una sucursal y quitar la referencia en las órdenes
export const deleteBranch = async (req, res) => {
  try {
    // Actualizar las órdenes asociadas para quitar la referencia a la sucursal eliminada
    await Order.updateMany(
      { branchId: req.params.id },
      { $unset: { branchId: "" } }
    );
    await Branch.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Sucursal eliminada con éxito");
    res.redirect("/branches");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Hubo un error al eliminar la sucursal");
    res.redirect("/branches");
  }
};