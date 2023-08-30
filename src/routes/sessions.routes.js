import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/fail-signup",
  }),
  (req, res) => {
    res.render("login", { message: "Usuario registrado con exito" });
  }
);

router.get("/fail-signup", (req, res) => {
  res.render("signup", { error: "No se pudo registrar el usuario" });
});

router.post(
  "/login",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

router.get("/fail-login", (req, res) => {
  res.render("login", { error: "Credenciales invalidas" });
});

router.get("/loginGithub",passport.authenticate("githubLoginStrategy"))

router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
  failureRedirect:"api/sessions/fail-signup"
}),(req,res)=>{
  res.redirect("/perfil")
})

router.get("/logout", (req, res) => {
  req.logOut(error=>{
    if(error){
      return res.render("profile", {
        user: req.user,
        error: "No se pudo cerrar la sesion",
      });
    }else{
      req.session.destroy((error) => {
        if (error)
          return res.render("profile", {
            user: req.session.userInfo,
            error: "No se pudo cerrar la sesion",
          });
        res.redirect("/");
      });
    }
  })
  
});

export { router as sessionsRouter };
