import express from "express";
import { engine } from "express-handlebars";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import path from "path";
import { __dirname } from "./utils.js";
import { config } from "./config/config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { sessionsRouter } from "./routes/sessions.routes.js";
import {chatModel} from "./dao/models/chat.model.js";
import { mockingRouter } from "./routes/mocking.routes.js";
import { loggerRouter } from "./routes/logger.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerSpecs } from "./config/swagger.config.js";
import swaggerUI from "swagger-ui-express"
import { initializePassport } from "./config/passportConfig.js";
import passport from "passport";
import { addLogger } from "./helpers/logger.js";
import { usersRouter } from "./routes/users.routes.js";

const port = config.server.port;
const app = express();
const logger = addLogger();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)

app.use(express.static(path.join(__dirname, "/public")));

const expressServer = app.listen(port, () =>
  logger.info(`Server listening on port: ${port}`)
);

//socket.io
const io = new Server(expressServer);

//handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "views");

//Configuracion de sesiones
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

//Configuracion de passport(DESPUES de la config de session y ANTES de las rutas)
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/mockingproducts", mockingRouter);
app.use("/api/loggerTest", loggerRouter);
app.use("/api/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpecs)) //api documentada

//socket.io products
let products = [];
io.on("connection", (socket) => {
  socket.on("producto", (data) => {
    let id;
    if (!products.length) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
    data.id = id;
    products.push(data);
    io.emit("arrayProducts", products);
  });
  socket.on("productDelete", (id) => {
    const prodId = products.find((prod) => prod.id == id);
    if (prodId) {
      const result = products.indexOf(prodId);
      products.splice(result, 1);
    }
    io.emit("arrayProducts", products);
  });
});

//socket.io chat
io.on("connection", (socket) => {
  g("nuevo cliente conectado");
  socket.on("authenticated", async (msg) => {
    const messages = await chatModel.find();
    socket.emit("messageHistory", messages);
    socket.broadcast.emit("newUser", msg);
  });
  socket.on("message", async (data) => {
    const messageCreated = await chatModel.create(data)
    const messages = await chatModel.find();
    io.emit("messageHistory", messages);
  });
});
