import { Router } from "express";
import { generateProducts } from "../utils/helpers.js";

const router = Router()

router.get("/", (req, res) => {
  try {
    const cant = 100;
    let products = [];
    for (let i = 0; i < cant; i++) {
      const product = generateProducts();
      products.push(product);
    }
    res.json({ status: "success", data: products });
  } catch (error) {
    res.json({ status: "error", message: message.error });
  }
});

export {router as mockingRouter}