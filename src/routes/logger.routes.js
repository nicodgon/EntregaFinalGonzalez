import { Router } from "express";
import { addLogger } from "../helpers/logger.js";

const router = Router()
const logger = addLogger();

router.get("/", (req, res) => {
  logger.debug("mensaje de nivel debug");
  logger.info("mensaje de nivel info");
  logger.error("mensaje de nivel error");
  res.send("peticion recibida");
});

export {router as loggerRouter}