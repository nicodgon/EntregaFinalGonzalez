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
}
