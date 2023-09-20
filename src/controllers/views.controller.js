import { ProductsService } from "../services/products.service.js";
import { CartsService } from "../services/carts.service.js";

export class ViewsController{
  static renderHome = async (req, res) => {
    try {
      const { limit = 10, page = 1, filtro, sort } = req.query;
      if (sort && sort !== "asc" && sort !== "des") {
        return res.render("products", {
          error: "El orden de los productos no es valido",
        });
      }
      const result = await ProductsService.getAll(limit, page, filtro, sort);
      if (result) {
        const prods = result.docs;
        res.render("home", { prods });
      } else {
        res.json({
          status: "error",
          payload: "Ha ocurrido un error al intentar obtener los productos",
        });
      }
    } catch (error) {
      res.render("home", { error: "No es posible visualizar los datos" });
    }
  }

  static renderProducts= async (req, res) => {
    try {
      const { limit = 10, page = 1, filtro, sort } = req.query;
      //Sort
      if (sort && sort !== "asc" && sort !== "des") {
        return res.render("products", {
          error: "El orden de los productos no es valido",
        });
      }
      const result = await ProductsService.getAll(limit, page, filtro, sort);
      if (result) {
        //Formato del objeto
        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        let nextL;
        let prevL;
        //reconocer si la palabra page esta incluida en la url
        const arr = [req.originalUrl];
        const pageExists = arr.some((e) => e.includes("page"));
        //NEXT
        if (pageExists) {
          nextL = result.hasNextPage
            ? `${baseUrl.replace(
                `page=${result.page}`,
                `page=${result.nextPage}`
              )}`
            : null;
        } else {
          nextL = `${baseUrl}?page=${result.page + 1}`;
        }
        //PREV
        if (pageExists) {
          prevL = result.hasPrevPage
            ? `${baseUrl.replace(
                `page=${result.page}`,
                `page=${result.prevPage}`
              )}`
            : null;
        } else {
          if (result.page != 1 && result.page != 0) {
            prevL = `${baseUrl}?page=${result.page - 1}`;
          } else {
            prevL = null;
          }
        }
        const resultView = {
          status: "success",
          payload: result.docs,
          totalPages: result.totalPages,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          page: result.page,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevLink: prevL,
          nextLink: nextL,
          user: req.session.userInfo,
        };
        res.render("products", resultView);
      } else {
        res.json({
          status: "error",
          payload: "Ha ocurrido un error al intentar obtener los productos",
        });
      }
    } catch (error) {
      res.render("products", { error: "No es posible visualizar los datos" });
    }
  }
  static renderCart= async (req, res) => {
    try {
      const cid = req.params.cid;
      const result = await CartsService.get(cid);
      if (result) {
        const prod = result.products;
        res.render("cart", { prod });
      } else {
        res.json({ status: "error", message: "ha ocurrido un error" });
      }
    } catch (error) {
      res.render("cart", { error: "No es posible visualizar los datos" });
    }
  }
  static renderSignup= (req, res) => {
    res.render("signup");
  }
  static renderLogin= (req, res) => {
    res.render("login");
  }
  static renderProfile= (req, res) => {
    res.render("profile", { user: JSON.parse(JSON.stringify(req.user)) });
  }
  static renderRealTimeProducts= (req, res) => {
    res.render("realTimeProducts");
  }
}