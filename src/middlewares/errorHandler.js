import { EError } from "../enums/EError.js"

export const errorHandler = (error,req,res,next)=>{
  switch(error.code){
    case EError.AUTH_ERROR:
      res.status(401).json({status:"error",error:error.cause})
    case EError.INVALID_JSON:
      res.status(401).json({status:"error",error:error.message})
    case EError.DATABASE_ERROR:
      res.status(500).json({status:"error",error:error.cause})
    default:
      res.status(500).json({status:"error",error:"error desconocido"})
  }
}