import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);  
router.get("/about", renderAbout); 

// Nueva ruta para el menú principal
router.get("/menu", (req, res) => {
    res.render("menu"); // Renderiza la vista "menu.hbs"
  });

export default router;