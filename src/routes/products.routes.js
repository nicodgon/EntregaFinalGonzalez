// import { ProductManager } from "../dao/managers/fileSystem/productsFs.js"
// si no funciona cambiar el filePath por "src/data/products.json"
// const filePath = "src/data/products.json";
// const productService = new ProductManager(filePath);

import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";
import { Router } from "express";

const router = Router();
const productService=new ProductsMongo();

//Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    const query = req.query.query;
    const sort = parseInt(req.query.sort);
    const result = await productService.getProducts(limit,page,query,sort);
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.send(error.message);
  }
});
//Obtener producto por id
router.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const result = await productService.getProductById(pid);
    if(result){
      res.json({ status: "success", payload: result });
    }else{
      res.json({ status: "error", message: "El producto no ha sido encontrado" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
// Agregar producto
router.post("/", async (req, res) => {
  try {
    const prod = req.body;
    const agregado = await productService.addProduct(prod);
    if(agregado){
      res.json({ status: "success", message: "Producto agregado" });
    } else {
      res.json({ status: "error", message: "El producto no ha sido agregado correctamente" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
// Actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const prod = req.body;
    const updateProd= await productService.updateProduct(pid, prod);
      if (updateProd){
      res.json({ status: "success", message: "Producto actualizado" });
    }else{
      res.json({ status: "error", message: "El producto no ha sido actualizado correctamente" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
// Eliminar producto
router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleteProd = await productService.deleteProduct(pid);
    if(deleteProd){
      res.json({ status: "success", message: "Producto eliminado" });
    }else{
      res.json({ status: "error", message: "El producto no ha sido eliminado correctamente" });
    }
  } catch (error) {
    res.send(error.message);
  }
});

export { router as productsRouter };
