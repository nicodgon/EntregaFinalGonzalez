import mongoose from "mongoose";
import { cartsCollection } from "../../constants/index.js";
import { usersCollection } from "../../constants/index.js";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    required: true,
  },
  cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref: cartsCollection,
  },
  role:{
    type: String,
    required:true,
    enum:["user","admin"],
    default:"user"
  }
});

export const usersModel = mongoose.model(usersCollection, userSchema);
