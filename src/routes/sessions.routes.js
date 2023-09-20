import { Router } from "express";
import passport from "passport";
import { sessionsController } from "../controllers/sessions.controller.js";
const router = Router();

router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/fail-signup",
  }),
  sessionsController.renderLogin
);

router.get("/fail-signup", sessionsController.renderFailSignup);

router.post(
  "/login",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  sessionsController.renderProfile
);

router.get("/fail-login", sessionsController.renderFailLogin);

router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get(
  "/github-callback",
  passport.authenticate("githubLoginStrategy", {
    failureRedirect: "api/sessions/fail-signup",
  }),
  sessionsController.renderProfile
);

router.get("/logout", sessionsController.renderProfileLogOut);

export { router as sessionsRouter };
