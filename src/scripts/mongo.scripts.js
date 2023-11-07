import {productsModel} from "../dao/models/products.model.js"
import {config} from "../config/config.js"
import mongoose from "mongoose"

const updateProducts = async()=>{
  try {
    await mongoose.connect(config.mongo.url)
    console.log("base de datos conectada")
    const adminId="6549991027df85fdee64ea66"
    const result = await productsModel.updateMany({},{$set:{owner:adminId}})
    console.log(result)
  } catch (error) {
    console.log(error)
  }finally{
    await mongoose.connection.close()
  }
}

updateProducts()