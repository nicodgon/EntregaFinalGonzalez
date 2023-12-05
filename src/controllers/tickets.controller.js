import { TicketsService } from "../services/tickets.service.js";
import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";
import { v4 as uuidv4 } from "uuid";

export class TicketsController {
  static async createTicket(req, res) {
    try {
      const cartId = req.params.cid;
      const cart = await CartsService.get(cartId);
      //Array de productos del carrito
      const productsCart = cart.products;
      let purchaseProducts = 0;
      let rejectedProducts = [];
      let idRejected = [];
      if (cart.products.length !== 0) {
        for (let i = 0; i < productsCart.length; i++) {
          //Producto actual
          const productCart = productsCart[i];
          //Obtener los productos de la base de datos a traves de los id del carrito
          const product = await ProductsService.getOne(productCart.product._id);
          const quantityCart = productCart.quantity;
          const stockDataBase = product.stock;
          if (quantityCart <= stockDataBase && stockDataBase != 0) {
            const result = stockDataBase - quantityCart;
            const updateProd = await ProductsService.update(
              productCart.product._id,
              { $set: { stock: result } }
            );
            purchaseProducts += quantityCart * productCart.product.price;
          } else {
            rejectedProducts.push(productCart);
            idRejected.push(productCart.product._id);
          }
        }
        let id = uuidv4();
        const newTicket = {
          code: id,
          purchase_datetime: new Date(),
          amount: purchaseProducts,
          purchaser: req.user.email,
        };
        const ticketCreated = await TicketsService.createTicket(newTicket);
        const filter = await CartsService.updateAll(cartId, rejectedProducts);
        if (rejectedProducts.length == 0) {
          res.json({ status: "success", data: ticketCreated });
        } else {
          res.json({ status: "incomplete", data: idRejected });
        }
      } else {
        res.json({ status: "error", message: "El carrito esta vacio" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
}
