import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { checkRole, checkUserAuthenticated } from "../middlewares/auth.js";
const router = Router();

//Obtener todos los productos
router.get("/", productsController.getAllItems);
//Obtener producto por id
router.get("/:pid", productsController.getItem);
// Agregar producto
router.post("/", checkUserAuthenticated, checkRole(["admin","premium"]), productsController.addItem);
// Actualizar producto
router.put("/:pid", checkUserAuthenticated, checkRole(["admin"]),productsController.updateItem);
// Eliminar producto
router.delete("/:pid", checkUserAuthenticated, checkRole(["admin"]),productsController.deleteItem);

export { router as productsRouter };
