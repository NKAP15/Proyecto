import Note from "../models/Note.js";

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Porfavor escribe un nombre." });
  }
  if (!description) {
    errors.push({ text: "Por favor escribe una clasificacion" });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      title,
      description,
    });

  const newNote = new Note({ title, description });
  newNote.user = req.user.id;
  await newNote.save();
  req.flash("success_msg", "Medicamento agregado exitosamente");
  res.redirect("/notes");
};

export const renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();

  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Medicamento actualizado con éxito");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Medicamento eliminado exitosamente");
  res.redirect("/notes");
};
