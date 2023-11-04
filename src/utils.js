import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {config} from "./config/config.js"
import { truncateSync } from "fs";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Hashear la contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

//Comparar la contraseña real con la contraseña hasheada
//Parametros: usuario de la base de datos y contraseña del login
export const isValidPassword = (userDB, password) => {
  return bcrypt.compareSync(password, userDB.password);
};

export const validateToken = (token)=>{
  try {
    const info = jwt.verify(token,config.gmail.secretToken)
    return info.email
  } catch (error) {
    console.log("Error con el token", error.message)
    return null
  }
}