import {productsModel} from "../dao/models/products.model.js"
import {config} from "../config/config.js"
import mongoose from "mongoose"

const updateProducts = async()=>{
  try {
    await mongoose.connect(config.mongo.url)
    console.log("base de datos conectada")
    const adminId="656b2b094c1f27423bf6d383"
    const result = await productsModel.updateMany({},{$set:{owner:adminId}})
  } catch (error) {
    console.log(error)
  }finally{
    await mongoose.connection.close()
  }
}

updateProducts()