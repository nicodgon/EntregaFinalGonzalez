import { cartDao } from "../dao/index.js";

export class CartsService {
  static post = async () => {
    return await cartDao.addCart();
  };
  static get = async (cid) => {
    return await cartDao.getCartById(cid);
  };
  static add = async (cid, pid) => {
    return await cartDao.addProductById(cid, pid);
  };
  static delete = async (cid, pid) => {
    return await cartDao.deleteProductFromCart(cid, pid);
  };
  static deleteAll = async (cid) => {
    return await cartDao.deleteAllProductsFromCart(cid);
  };
  static updateAll = async (cid, prods) => {
    return await cartDao.updateAllProductsFromCart(cid, prods);
  };
  static updateProp = async (cid, pid, quant) => {
    return await cartDao.updateQuantity(cid, pid, quant);
  };
}
