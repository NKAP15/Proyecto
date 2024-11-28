import { Router } from "express";
import { renderIndex, renderAbout } from "../controllers/index.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
const router = Router();

router.get("/", renderIndex); 
router.get("/menu", isAuthenticated,(req, res) => {
    res.render("menu"); // Renderiza la vista "menu.hbs"
  });

export default router;