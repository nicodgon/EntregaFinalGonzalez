import { Router } from "express";
import { productService } from "../dao/index.js";
const router = Router();

//Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, filtro, sort } = req.query;
    if (sort && sort !== "asc" && sort !== "des") {
      return res.render("products", {
        error: "El orden de los productos no es valido",
      });
    }
    const result = await productService.getProducts(
      limit,
      page,
      filtro,
      sort
    );
    if (result) {
      res.json({ status: "success", payload: result });
    } else {
      res.json({
        status: "error",
        payload: "Ha ocurrido un error al intentar obtener los productos",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Obtener producto por id
router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await productService.getProductsById(pid);
    if (result) {
      res.json({ status: "success", payload: result });
    } else {
      res.json({
        status: "error",
        message: "El producto no ha sido encontrado",
      });
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
    if (agregado) {
      res.json({ status: "success", message: "Producto agregado" });
    } else {
      res.json({
        status: "error",
        message: "El producto no ha sido agregado correctamente",
      });
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
    const updateProd = await productService.updateProduct(pid, prod);
    if (updateProd) {
      res.json({ status: "success", message: "Producto actualizado" });
    } else {
      res.json({
        status: "error",
        message: "El producto no ha sido actualizado correctamente",
      });
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
    if (deleteProd) {
      res.json({ status: "success", message: "Producto eliminado" });
    } else {
      res.json({
        status: "error",
        message: "El producto no ha sido eliminado correctamente",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
});

export { router as productsRouter };
