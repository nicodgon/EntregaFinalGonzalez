import {productsModel} from "../../models/products.model.js"

export class ProductsMongo{
  constructor(){
    this.model=productsModel
  }

  //obtener products
  async getProducts(limit,page,query,sort){
    try{
      if(!page)page=1;
      if(limit){
        const prodsLimit= await this.model.find().limit(limit);
        return prodsLimit;
      }else if(query){
        const prodsQuery= await this.model.find({query:1}).limit(10);
        return prodsQuery;
      }else if(sort){
        const prodsSort= await this.model.find().sort({price:sort}).limit(10);
        return prodsSort;
      }else{
        const prodsPage= await this.model.paginate({},{limit:10,page:page});
        return prodsPage;
      }
    }catch(error){
      console.log(error.message);
      throw new Error("Hubo un error al obtener los productos");
    }
  }

  //obtener productos por id
  async getProductsById(id){
    try{
      const product= await this.model.findById(id);
      return product;
    }catch(error){
      console.log(error.message);
      throw new Error("Hubo un error al obtener el producto");
    }
  }

  //agregar productos
  async addProduct(productInfo){
    try{
      const productCreated= await this.model.create(productInfo);
      return productCreated;
    }catch(error){
      console.log(error.message);
      throw new Error("Hubo un error al crear el producto");
    }
  }

  //Actualizar producto
  async updateProduct(id,prod){
    try{
      const FindProd= await this.model.updateOne({_id:id},prod)
      return FindProd
    }catch(error){
      console.log(error.message);
      throw new Error("Hubo un error al actualizar el producto")
    }
  }

  //eliminar producto
  async deleteProduct(id){
    try{
      const product= await this.model.deleteOne({_id:id});
      return product;
    }catch(error){
      console.log(error.message);
      throw new Error("Hubo un error al obtener el producto");
    }
  }

  //Comprobar si existe el producto
  async existsProduct(id){
    try{
      const prod= await this.model.find({_id:{$eq:id}})
      if(prod){
        return true
      }else{
        return false
      }
    }catch(error){
      console.log(error.message)
    }
  }
}