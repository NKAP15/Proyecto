export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No autorizado. Debes iniciar sesion");
  res.redirect("/auth/signin");
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  req.flash("error_msg", "No autorizado para ver o registrar recepciones. No eres administrador.");
  res.redirect("/menu");
};