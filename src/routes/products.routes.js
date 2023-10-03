import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/auth.js";
const router = Router();

//Obtener todos los productos
router.get("/", productsController.getAllItems);
//Obtener producto por id
router.get("/:pid", productsController.getItem);
// Agregar producto
router.post("/", checkRole(["admin"]), productsController.addItem);
// Actualizar producto
router.put("/:pid", productsController.updateItem);
// Eliminar producto
router.delete("/:pid", productsController.deleteItem);

export { router as productsRouter };
