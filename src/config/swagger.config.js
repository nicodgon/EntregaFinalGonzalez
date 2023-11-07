import swaggerJsDoc from "swagger-jsdoc"
import path from "path"
import { __dirname } from "../utils.js";

const swaggerOptions = {
  definition:{
    openapi:"3.0.1",
    info:{
      title:"Documentacion api de productos",
      version:"1.0.0",
      description:"Definicion de endpoint para la API de productos"
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`]
  }
}