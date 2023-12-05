import { UsersService } from "../services/users.service.js";
import { generateEmailToken, recoveryEmail } from "../helpers/gmail.js";
import { validateToken, createHash } from "../utils.js";
import { UserDto } from "../dao/dto/user.dto.js";

export class sessionsController {
  static renderLogin = (req, res) => {
    res.render("login", { message: "Usuario registrado con exito" });
  };
  static renderFailSignup = (req, res) => {
    res.render("signup", { error: "No se pudo registrar el usuario" });
  };
  static renderProfile = (req, res) => {
    res.redirect("/perfil");
  };
  static renderFailLogin = (req, res) => {
    res.render("login", { error: "Credenciales invalidas" });
  };
  static renderProfileLogOut = (req, res) => {
    req.logOut((error) => {
      if (error) {
        return res.render("profile", {
          user: req.user,
          error: "No se pudo cerrar la sesion",
        });
      } else {
        req.session.destroy((error) => {
          if (error)
            return res.render("profile", {
              user: req.session.userInfo,
              error: "No se pudo cerrar la sesion",
            });
          res.redirect("/");
        });
      }
    });
  };
  static getUser=(req,res)=>{
    const user = req.user
    const dtoInfo = new UserDto(user)
    res.json({status:"success",message:dtoInfo})
  }
  static forgotPassword=async(req,res)=>{
    try {
      const {email}=req.body
      const user = await UsersService.getByEmail(email)
      if(!user){
        return res.json({status:"error",message:"No es posible restablecer la contraseña"})
      }
      const token = generateEmailToken(email,3*60) //Token de 3 min
      await recoveryEmail(req,email,token)
      res.send("Correo enviado, volver al inicio")
    } catch (error) {
      res.json({status:"error",message:"No es posible restablecer la contraseña"})
    }
  }
  static resetPassword=async(req,res)=>{
    try {
      const token=req.query.token
      const {newPassword} = req.body
      const validEmail = validateToken(token)
      if(validEmail){
        const user = await UsersService.getByEmail(validEmail)
        if(user){
          user.password=createHash(newPassword)
          await UsersService.updateUser(user._id, user)
          res.send("Contraseña actualizada <a href='/login'>Ir al login</a>")
        }
      }else{
        return res.send("El token ya caduco, volver a intentarlo <a href='/forgot-password'>Restablecer contraseña</a>")
      }
    } catch (error) {
      return res.send("No se pudo restablecer la contraseña, volver a intentarlo <a href='/forgot-password'>Restablecer contraseña</a>")
    }
  }
}
