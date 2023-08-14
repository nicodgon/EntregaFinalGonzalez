import {cartsModel} from "../../models/carts.model.js";

export class CartsMongo{
  constructor(){
    this.model=cartsModel
  }

  //Agregar carrito
  async addCart(){
    try{
      // crear nuevo carrito
      const newCart={
        products: []
      }
      // Agregar el carrito
      const content = await this.model.create(newCart);
      return content
    }catch(error){
      console.log(error.message);
    }
  }

  //obtener carrito por id
  async getCartById(id){
      try{
          const compareId = await this.model.findById(id)
          if(!compareId){
              return false
          }else{
              return compareId
          };
      }catch(error){
          console.log(error.message);
      }
  }

  //Agregar producto al carrito por id
  async addProductById(cid,pid){
    try{
      const newProduct = {
        product:2,
        quantity:1
      }
      const update = await this.model.create({_id:cid},{$set:{products:[newProduct]}})
      const result = await this.model.aggregate([
        {
          $match:{products:{product:pid}}
        }
      ])
      return result
    }catch(error){
      console.log(error.message);
    }
  }
}