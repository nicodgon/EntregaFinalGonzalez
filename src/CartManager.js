import fs from "fs";

export class CartManager {
  constructor (path){
    this.path = path;
  }
  async addCart(){
    try{
      // Leer el arhivo y guardar en una variable
      const content = await fs.promises.readFile(this.path,'utf-8');
      const carts= JSON.parse(content);
      // Declarar el id autoincrementable
      let id;
      if (!carts.length){
          id = 1;
      } else {
          id=carts[carts.length-1].id+1;
      }
      // crear nuevo carrito con el id autoincrementable
      const newCart={
        id:id,
        products: []
      }
      // agregar nuevo carrito
      carts.push(newCart);
      await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
    }catch(error){
      console.log(error.message);
    }
  }
  async getCartById(id){
      try{
          const contenido = await fs.promises.readFile(this.path,"utf-8");
          const carts = JSON.parse(contenido);
          const compareId = carts.find(e=>e.id == id);
          if(!compareId){
              return false
          }else{
              return compareId
          };
      }catch(error){
          console.log(error.message);
      }
  }
  async addProductById(cid,pid){
    try{
      // leer archivo y comprar id del carro con el id recibido
      const contenido = await fs.promises.readFile(this.path,"utf-8");
      const carts = JSON.parse(contenido);
      const compareIdCart = carts.find(e=>e.id == cid);
      if(compareIdCart){
        const indexCart = carts.indexOf(compareIdCart);
        const product = {
          product:pid,
          quantity:1
        }
        const compareIdProducts = carts[indexCart].products.find(e=>e.product == pid);
        if(compareIdProducts){
          const indexProd = carts[indexCart].products.indexOf(compareIdProducts);
          carts[indexCart].products[indexProd].quantity+=1
        }else{
          carts[indexCart].products.push(product)
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
        return true
      }else{
        return false
      };
    }catch(error){
      console.log(error.message);
    }
  }
}