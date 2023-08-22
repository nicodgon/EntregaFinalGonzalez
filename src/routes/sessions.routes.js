import { Router } from "express";
import { userService } from "../dao/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const form = req.body;
    const exists = await userService.getUserByEmail(form.email);
    if (exists) {
      res.render("signup", { error: "Este usuario ya ha sido registrado" });
    } else {
      await userService.addUser(form);
      res.render("login", { message: "Usuario registrado con exito" });
    }
  } catch (error) {
    res.render("signup", { error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const form = req.body;
    const exists = await userService.getUserByEmail(form.email);
    if (!exists) {
      return res.render("login", { message: "Usuario no registrado" });
    }
    if (exists.password === form.password) {
      //sistema de roles
      const role = await userService.checkRole(form.password,form.email)
      if(role){
        req.session.userInfo = {
          first_name: exists.first_name,
          email: exists.email,
          role: role
        };
        res.redirect("/products")
      }else {
        return res.render("login", { message: "Ha ocurrido un error" });
      }
    } else {
      return res.render("login", { message: "Email y/o contraseña incorrecto" });
    }
  } catch (error) {
    res.render("signup", { error: error.message });
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy(error=>{
    if(error) return res.render("profile",{user: req.session.userInfo, error:"La sesion no fue cerrada exitosamente"})
    res.redirect("/")
  })
});

export { router as sessionsRouter };
