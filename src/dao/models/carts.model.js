import mongoose from "mongoose";

//nombre de la coleccion de productos
const cartsCollection = "carts";

//esquema de productos
const cartsSchema = new mongoose.Schema({
  products:{
    type:[
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'products'
        },
        quantity:{
          type:Number,
          required:true,
          default:1
        }
      }
    ],
    default:[],
    required:true
  },
})

cartsSchema.pre('find',function(next){
  this.populate('product.id');
})

export const cartsModel=mongoose.model(cartsCollection,cartsSchema)