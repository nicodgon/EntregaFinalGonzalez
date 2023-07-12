import fs from "fs";

export class CartManager {
  constructor (path){
    this.path = path;
  }
  addCart(){
    try{
      // Leer el arhivo y guardar en una variable
      const content = fs.readFileSync(this.path,'utf-8');
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
      fs.writeFileSync(this.path,JSON.stringify(carts,null,'\t'));
    }catch(error){
      console.log(error.message);
    }
  }
  getCartById(id){
      try{
          const contenido = fs.readFileSync(this.path,"utf-8");
          const carts = JSON.parse(contenido);
          const compareId = carts.find(e=>e.id == id);
          if(!compareId){
              return {error:'the object with the specified id does not exist'}
          }else{
              return compareId
          };
      }catch(error){
          console.log(error.message);
      }
  }
  addProductById(cid,pid){
    try{
      // leer archivo y comprar id del carro con el id recibido
      const contenido = fs.readFileSync(this.path,"utf-8");
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
        fs.writeFileSync(this.path,JSON.stringify(carts,null,'\t'));
      }else{
        console.log('error: the cart with the specified id does not exist')
      };
    }catch(error){
      console.log(error.message);
    }
  }
}