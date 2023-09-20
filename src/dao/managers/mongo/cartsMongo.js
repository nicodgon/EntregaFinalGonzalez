import { cartsModel } from "../../models/carts.model.js";

export class CartsMongo {
  constructor() {
    this.model = cartsModel;
  }

  //Agregar carrito
  async addCart() {
    try {
      // crear nuevo carrito
      const newCart = {
        products: [],
      };
      // Agregar el carrito
      const content = await this.model.create(newCart);
      return content;
    } catch (error) {
      console.log(error.message);
    }
  }

  //obtener carrito por id
  async getCartById(id) {
    try {
      const compareId = await this.model
        .findById(id)
        .populate("products.product").lean();
      if (!compareId) {
        return false;
      } else {
        return compareId;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //Agregar producto al carrito por id
  async addProductById(cid, pid) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const newProduct = {
        product: pid,
        quantity: 1,
      };
      const existingProductIndex = cart.products.findIndex(
        p => p.product == pid
      );
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push(newProduct);
      }
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.log(error.message);
    }
  }

  //Eliminar producto del carrito por id
  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const existingProductIndex = cart.products.findIndex(
        (p) => p.product == pid
      );
      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
        const del = await cart.save();
        return del;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //Eliminar todos los productos del carrito
  async deleteAllProductsFromCart(cid) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = [];
      const delAll = await cart.save();
      return delAll;
    } catch (error) {
      console.log(error.message);
    }
  }

  //Actualizar todos los productos del carrito
  async updateAllProductsFromCart(cid, prods) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = prods;
      const updateAll = await cart.save();
      return updateAll;
    } catch (error) {
      console.log(error.message);
    }
  }

  //Actualizar la cantidad de un producto en el carrito
  async updateQuantity(cid, pid, quant) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const existingProductIndex = cart.products.findIndex(
        (p) => p.product == pid
      );
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quant;
        const updateQuantity = await cart.save();
        return updateQuantity;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
