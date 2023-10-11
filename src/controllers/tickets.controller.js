import { TicketsService } from "../services/tickets.service.js";
import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";

export class TicketsController{
  static async createTicket(req,res){
    try {
      const cartId = req.params.cid
      const cart = await CartsService.get(cartId)
      const productsCart = cart.products
      let purchaseProducts =[]
      let rejectedProducts = []
      for(let i=0;i<productsCart.length;i++){
        const product = ProductsService.getOne(productsCart[i]).product
      }
      const newTicket={
        code,
        purchase_datatime:new Date(),
        amout,
        purchaser:req.user.email
      }
      const ticketCreated = await TicketsService.createTicket(newTicket)
    } catch (error) {
      res.json({status:"error",message:error.message})
    }
  }
}