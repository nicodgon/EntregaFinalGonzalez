import { ProductsService } from "../services/products.service.js";

export class productsController {
  static getAllItems = async (req, res) => {
    try {
      const { limit = 10, page = 1, filtro, sort } = req.query;
      if (sort && sort !== "asc" && sort !== "des") {
        return res.render("products", {
          error: "El orden de los productos no es valido",
        });
      }
      const result = await ProductsService.getAll(limit, page, filtro, sort);
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
  };

  static getItem = async (req, res) => {
    try {
      const pid = req.params.pid;
      const result = await ProductsService.getOne(pid);
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
  };
  static addItem = async (req, res) => {
    try {
      const prod = req.body;
      const aggregate = await ProductsService.add(prod);
      if (aggregate) {
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
  };
  static updateItem = async (req, res) => {
    try {
      const pid = req.params.pid;
      const prod = req.body;
      const updateProd = await ProductsService.update(pid, prod);
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
  };
  static deleteItem = async (req, res) => {
    try {
      const pid = req.params.pid;
      const deleteProd = await ProductsService.delete(pid);
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
  };
}
