import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js";
import { TicketsController } from "../controllers/tickets.controller.js";
import { checkRole, checkUserAuthenticated } from "../middlewares/auth.js";

const router = Router();

//Obtener carrito por id
router.get("/:cid",CartController.getCart);
//Agregar carrito
router.post("/",CartController.postCart);
// Agregar producto al carrito por id
router.post("/:cid/product/:pid",checkUserAuthenticated,checkRole(["user","premium"]),CartController.postProductToCart);
//Crear ticket
router.post("/:cid/purchase", TicketsController.createTicket)
//Actualizar todos los productos del carrito
router.put("/:cid",CartController.updateProducts);
//Actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid",CartController.updateProductQuantity);
//Eliminar producto del carrito por id
router.delete("/:cid/product/:pid",CartController.deleteProduct);
//Eliminar todos los productos del carrito
router.delete("/:cid",CartController.deleteAllProducts);

export { router as cartsRouter };