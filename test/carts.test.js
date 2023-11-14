import mongoose from "mongoose"
import { CartsMongo } from "../src/dao/managers/mongo/cartsMongo.js"
import Assert from "assert"

const testDB= "mongodb+srv://nicolasdg19:g8my3m9t@cluster0.43j432j.mongodb.net/ecommerceTest?retryWrites=true&w=majority"

describe("Pruebas para manager de carritos",function(){
  before(async function(){
    await mongoose.connect(testDB)
    console.log("Base de datos de prueba conectada")
    this.cartsManager = new CartsMongo()
  })

  it("El metodo addCart debe agregar un carrito a la base de datos", async function(){
  })
  it("El metodo getCartById debe retornar el carrito a traves del id", async function(){
    const response = await this.cartsManager.getCartById()
  })
  it("El metodo addProductById debe agregar el producto a traves del id al carrito en la base de datos", async function(){
    
  })
  it("El metodo deleteProductFromCart debe eliminar el producto del carrito en la base de datos", async function(){
    
  })
  it("El metodo deleteAllProductsFromCart debe eliminar todos los productos del carrito en la base de datos", async function(){
    
  })
  it("El metodo updateAllProductsFromCart debe actualizar todos los productos del carrito en la base de datos", async function(){
    
  })
  it("El metodo updateQuantity actualizar la cantidad de un producto dentro del carrito en la base de datos", async function(){
    
  })
})