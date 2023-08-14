import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

//nombre de la coleccion de productos
const productsCollection = "products";

//esquema de productos
const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  thumbnails:{
    type:String,
    required:true
  },
  code:{
    type:String,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  status:{
    type:Boolean,
    required:true
  },
  category:{
    type:String,
    required:true,
    enum:["remeras","pantalones","camperas","zapatillas"]
  }
})

productSchema.plugin(mongoosePaginate)

export const productsModel=mongoose.model(productsCollection,productSchema)