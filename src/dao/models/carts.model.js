import mongoose from "mongoose";
import { cartsCollection, productsCollection } from "../../constants/index.js";

//esquema de productos
const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: productsCollection,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    default: [],
    required: true,
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);