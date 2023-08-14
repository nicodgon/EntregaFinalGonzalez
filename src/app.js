import express from "express";
import {engine} from "express-handlebars"
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import path from "path";
import { __dirname } from "./utils.js";
import { config } from "./config/config.js"
import { connectDB } from "./config/dbConnection.js";

const port = config.server.port;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//midlewares
app.use(express.static(path.join(__dirname,"/public")))

const expressServer = app.listen(port, () => console.log(`Server listening on port: ${port}`));

//conexion a la base de datos
connectDB();

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
    let id;
    if (!products.length) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
    data.id=id
    products.push(data)
    io.emit('arrayProducts',products);
  })
  socket.on("productDelete",(id)=>{
    const prodId=products.find(prod=>prod.id==id)
    if(prodId){
      const result=products.indexOf(prodId)
      products.splice(result,1)
    }
    io.emit('arrayProducts',products);
  })
})