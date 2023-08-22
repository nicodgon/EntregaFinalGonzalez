import { productsModel } from "../../models/products.model.js";
import { categories } from "../../../constants/index.js";

export class ProductsMongo {
  constructor() {
    this.model = productsModel;
  }

  //obtener products
  async getProducts(limit, page, query, sort) {
    try {
      let filtro = {};
      //Filtro de categoria
      if (categories.includes(query)) {
        filtro = { category: query };
      } else {
        //Filtro de stock
        const stockValue = query === 0 ? undefined : parseInt(query);
        if (stockValue) {
          //busca el valor mayor o igual al especificado
          filtro = { stock: { $gte: stockValue } };
        }
      }
      const valueSort = sort === "asc" ? 1 : -1;
      const prodsPage = await this.model.paginate(filtro, {
        limit: limit,
        page: page,
        sort: { price: valueSort },
        lean: true //Esto sirve para poder trabajar con el formato json en las vistas
      });
      return prodsPage;
    } catch (error) {
      console.log(error.message);
      throw new Error("Hubo un error al obtener los productos");
    }
  }

  //obtener productos por id
  async getProductsById(id) {
    try {
      const product = await this.model.findById(id);
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("Hubo un error al obtener el producto");
    }
  }

  //agregar productos
  async addProduct(productInfo) {
    try {
      const productCreated = await this.model.create(productInfo);
      return productCreated;
    } catch (error) {
      console.log(error.message);
      throw new Error("Hubo un error al crear el producto");
    }
  }

  //Actualizar producto
  async updateProduct(id, prod) {
    try {
      const FindProd = await this.model.updateOne({ _id: id }, prod);
      return FindProd;
    } catch (error) {
      console.log(error.message);
      throw new Error("Hubo un error al actualizar el producto");
    }
  }

  //eliminar producto
  async deleteProduct(id) {
    try {
      const product = await this.model.deleteOne({ _id: id });
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("Hubo un error al obtener el producto");
    }
  }

  //Comprobar si existe el producto
  async existsProduct(id) {
    try {
      const prod = await this.model.find({ _id: { $eq: id } });
      if (prod) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
