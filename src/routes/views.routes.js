import { Router } from "express";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";
import { ViewsController } from "../controllers/views.controller.js";
const router = Router();

//Obtener todos los productos
router.get("/", ViewsController.renderHome);

router.get("/products", ViewsController.renderProducts);

router.get("/carts/:cid",ViewsController.renderCart);

router.get("/registro", showLoginView,ViewsController.renderSignup);

router.get("/login", showLoginView,ViewsController.renderLogin);

router.get("/perfil", checkUserAuthenticated,ViewsController.renderProfile);

router.get("/realTimeProducts",ViewsController.renderRealTimeProducts);

router.get("/forgot-password", ViewsController.renderForgot)

router.get("/reset-password", ViewsController.renderResetPass)

export { router as viewsRouter };
