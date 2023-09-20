import { productDao } from "../dao/index.js";

export class ProductsService {
  static getAll = async (limit, page, filtro, sort) => {
    return await productDao.getProducts(limit, page, filtro, sort);
  };
  static getOne = async (pid) => {
    return await productDao.getProductsById(pid);
  };
  static add = async (pid) => {
    return await productDao.addProduct(pid);
  };
  static update = async (pid, prod) => {
    return await productDao.updateProduct(pid, prod) ;
  };
  static delete = async (pid) => {
    return await productDao.deleteProduct(pid);
  };
  static exists = async (pid) => {
    return await productDao.existsProduct(pid);
  };
}
