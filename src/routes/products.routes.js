import { ProductManager } from "../ProductManager.js"
import { Router } from "express";
const router = Router();
// si no funciona cambiar el filePath por "src/data/products.json"
const filePath = "src/data/products.json";
const productService = new ProductManager(filePath);

router.get ("/", async (req,res)=>{
  try{
    const limit = parseInt(req.query.limit);
    const result = await productService.getProducts(limit);
    res.json({status:"success",payload:result});
  }catch(error){
    res.send(error.message);
  }
})
router.get ("/:pid", async (req,res)=>{
  try{
    const pid = parseInt(req.params.pid);
    const result = await productService.getProductById(pid);
    res.json({status:"success",payload:result});
  }catch(error){
    res.send(error.message);
  }
})
router.post ("/", async (req,res)=>{
  try{
    const prod = await req.body;
    productService.addProduct(prod);
    res.json({status:"success",message:"Usuario creado"});
  }catch(error){
    res.send(error.message);
  }
})
router.put ("/:pid", async (req,res)=>{
  try{
    const pid = parseInt (req.params.pid);
    const prod = await req.body;
    productService.updateProduct(pid,prod);
    res.json({status:"success",message:"Usuario actualizado"});
  }catch(error){
    res.send(error.message);
  }
})
router.delete("/:pid", async (req,res)=>{
  try{
    const pid = parseInt (req.params.pid);
    productService.deleteProduct(pid);
    res.json({status:"success",message:"Usuario eliminado"});
  }catch(error){
    res.send(error.message);
  }
})

export {router as productsRouter}