import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UsersController } from "../controllers/users.controller.js";

const router = Router()

//El administrador puede cambiar el role del resto de usuarios
router.post("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole)

export {router as usersRouter}