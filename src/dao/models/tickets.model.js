import mongoose from "mongoose";
import { ticketsCollection } from "../../constants/index.js";

//esquema de productos
const ticketsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  purchase_datetime:Date,
  amount: {
    type: Number,
    required: true,
  },
  purhcaser: String
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);
