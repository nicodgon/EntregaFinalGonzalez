import { ProductsService } from "../services/products.service.js";
import { CustomError } from "../services/error/customError.service.js";
import { createProductError } from "../services/error/createProductError.service.js";
import { EError } from "../enums/EError.js";

export class productsController {
  static getAllItems = async (req, res) => {
    try {
      const { limit = 10, page = 1, filtro, sort } = req.query;
      if (sort && sort !== "asc" && sort !== "des") {
        return res.json({status:"error",error:"El orden de los productos no es valido"})
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
      //Generar error por falta de datos
      if(!prod.title || !prod.description || !prod.price || !prod.thumbnails || !prod.code || !prod.stock || !prod.status || !prod.category ){
        CustomError.createError({
          name: "error createProduct",
          cause: createProductError(prod),
          message: "Datos invalidos para crear el producto",
          errorCode: EError.INVALID_JSON
        })
      }
      prod.owner = req.user._id
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
      const exist = await ProductsService.exists(pid);
      if (exist) {
        const updateProd = await ProductsService.update(pid, prod);
        if (updateProd) {
          res.json({ status: "success", message: "Producto actualizado" });
        } else {
          res.json({
            status: "error",
            message: "El producto no ha sido actualizado correctamente",
          });
        }
      }else{
        res.json({
          status: "error",
          message: "El id del producto no existe",
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  };
  static deleteItem = async (req, res) => {
    try {
      const pid = req.params.pid;
      const product = await ProductsService.getOne(pid)
      const role = req.user.role
      if(role === "premium" && product.owner.toString()=== req.user._id.toString() || role === "admin"){
        const deleteProd = await ProductsService.delete(pid);
        if (deleteProd) {
          res.json({ status: "success", message: "Producto eliminado" });
        } else {
          res.json({
            status: "error",
            message: "El producto no ha sido eliminado correctamente",
          });
        }
      }else{
        res.json({status:"error",message:"No tienes permisos"})
      }
    } catch (error) {
      res.send(error.message);
    }
  };
}
