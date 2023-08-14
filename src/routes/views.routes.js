import { ProductManager } from "../dao/managers/fileSystem/productsFs.js"
import { Router } from "express";
const router = Router();
// si no funciona cambiar el filePath por "src/data/products.json"
const filePath = "src/data/products.json";
const productService = new ProductManager(filePath);

//Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const result = await productService.getProducts(limit);
    res.render('home',{result});
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/realTimeProducts", (req, res) => {
  try {
    res.render('realTimeProducts');
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/products", (req, res) => {
  try {
    res.render('products');
  } catch (error) {
    res.send(error.message);
  }
});

export {router as viewsRouter}