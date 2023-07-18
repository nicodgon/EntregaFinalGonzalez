import express from "express";
import {engine} from "express-handlebars"
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import path from "path";
import { __dirname } from "./utils.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Midlewares
app.use(express.static(path.join(__dirname,"/public")))

const expressServer = app.listen(port, () => console.log(`Server listening on port: ${port}`));

//socket.io
const io= new Server(expressServer)

//handlebars
app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','views')

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

//socket.io
let products=[];
io.on("connection",(socket)=>{
  socket.on("producto",(data)=>{
    products.push(data)
    io.emit('arrayProducts',products);
  })
})