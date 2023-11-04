import jwt from "jsonwebtoken"
import {config} from "../config/config.js"
import { gmailTransporter } from "../config/gmail.config.js"

export const generateEmailToken=(email,expireTime)=>{
  const token = jwt.sign({email},config.gmail.secretToken,{expiresIn:expireTime})
  return token
}

export const recoveryEmail = async(req,userEmail,emailToken)=>{
  try {
    const domain = `${req.protocol}://${req.get('host')}`
    const link=`${domain}/reset-password?token=${emailToken}`
    await gmailTransporter.sendMail({
      from:"Ecommerce",
      to:userEmail,
      subject:"Restablecer contraseña",
      html:`
        <p>Usted solicitó restablecer su contraseña</p>
        <p>Ingrese al siguiente enlace: <a href=${link}>Restablecer contraseña</p>
      `
    })
  } catch (error) {
    console.log(`Hubo un error ${error.message}`)
  }
}