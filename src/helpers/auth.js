export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No autorizado. Debes iniciar sesion");
  res.redirect("/auth/signin");
};
