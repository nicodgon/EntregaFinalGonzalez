import { CartManager } from "../CartManager.js";
import { ProductManager } from "../ProductManager.js";
import { Router } from "express";
const router = Router();
// si no funciona cambiar el filePath por "src/data/products.json"
const filePathCarts = "src/data/carts.json";
const filePathProducts = "src/data/products.json";
const callCart = new CartManager(filePathCarts);
const productService = new ProductManager(filePathProducts);

router.post("/", async (req, res) => {
  try {
    await callCart.addCart();
    res.json({ status: "success", message: "Carrito agregado" });
  } catch (error) {
    res.send(error.message);
  }
});
// Agregar producto al carrito según id
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const exist = await productService.existProduct(pid);
    if (exist) {
      const result= await callCart.addProductById(cid, pid);
      if(result){
        res.json({ status: "success", message: "Producto agregado" });
      }else{
        res.json({ status: "error", message: "Carrito no encontrado" });
      }
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
router.get("/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const result = await callCart.getCartById(cid);
    if(result){
      res.json({ status: "success", payload: result });
    }else{
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});

export { router as cartsRouter };
