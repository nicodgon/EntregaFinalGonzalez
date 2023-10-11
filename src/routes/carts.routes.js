import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js";
import { TicketsController } from "../controllers/tickets.controller.js";
const router = Router();

//Agregar carrito
router.post("/",CartController.postCart);
//Obtener carrito por id
router.get("/:cid",CartController.getCart);
// Agregar producto al carrito por id
router.post("/:cid/product/:pid",CartController.postProductToCart);
//Eliminar producto del carrito por id
router.delete("/:cid/product/:pid",CartController.deleteProduct);
//Eliminar todos los productos del carrito
router.delete("/:cid",CartController.deleteAllProducts);
//Actualizar todos los productos del carrito
router.put("/:cid",CartController.updateProducts);
//Actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid",CartController.updateProductQuantity);
//Crear ticket
router.post("/:cid/purchase", TicketsController.createTicket)
export { router as cartsRouter };
