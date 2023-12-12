import { CartsService } from "../services/carts.service.js"
import { ProductsService } from "../services/products.service.js";

export class CartController{
  static postCart= async (req, res) => {
    try {
      const result = await CartsService.post();
      if (result) {
        res.json({ status: "success", message: "Carrito agregado" });
      } else {
        res.json({
          status: "success",
          message: "El carrito no ha sido agregado correctamente",
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static getCart=async (req, res) => {
    try {
      const cid = req.params.cid;
      const result = await CartsService.get(cid);
      if (result) {
        res.json({ status: "success", payload: result });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static postProductToCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const exist = await ProductsService.exists(pid);
      if (exist) {
        const product = await ProductsService.getOne(pid)
        const role = req.user.role
        if(role === "premium" && product.owner.toString()=== req.user._id.toString()){
          res.json({ status: "error", message: "No es posible agregar un producto propio" });
        }else{
          const result = await CartsService.add(cid, pid);
          if (result) {
            res.json({ status: "success", message: "Producto agregado" });
          } else {
            res.json({ status: "error", message: "Ha ocurrido un error" });
          }
        }
      } else {
        res.json({ status: "error", message: "Producto no encontrado" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static deleteProduct =  async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await CartsService.delete(cid, pid);
      if (result) {
        res.json({
          status: "success",
          message: "El producto ha sido eliminado correctamente",
        });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static deleteAllProducts = async (req, res) => {
    try {
      const cid = req.params.cid;
      const result = await CartsService.deleteAll(cid);
      if (result) {
        res.json({
          status: "success",
          message: "Los productos del carrito han sido eliminados correctamente",
        });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static updateProducts = async (req, res) => {
    try {
      const cid = req.params.cid;
      const prods = req.body;
      const result = await CartsService.updateAll(cid, prods);
      if (result) {
        res.json({
          status: "success",
          message:
            "Los productos del carrito han sido actualizados correctamente",
        });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  static updateProductQuantity = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const body = req.body;
      const quant = body.quantity;
      const result = await CartsService.updateProp(cid, pid, quant);
      if (result) {
        res.json({
          status: "success",
          message: "La cantidad del producto ha sido actualizada correctamente",
        });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.send(error.message);
    }
  }
}