import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { productsCollection } from "../../constants/index.js";
import { categories } from "../../constants/index.js";
import { usersCollection } from "../../constants/index.js";

//esquema de productos
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: categories,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:usersCollection,
    default:"admin"
  }
});

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);
