import { connectDB } from "../config/dbConnection.js";
import { CartsMongo } from "./managers/mongo/cartsMongo.js";
import { ProductsMongo } from "./managers/mongo/productsMongo.js";
import { UsersMongo } from "./managers/mongo/usersMongo.js";
// import { config } from "../config/config.js";
// import {CartManager} from "./managers/fileSystem/cartFs.js"
// import {ProductManager} from "./managers/fileSystem/productsFs.js"
//Persistencia de archivos Filesystem
// const productDao = new ProductManager(config.fileSystem.productsFs)
// const cartDao = new CartManager(config.fileSystem.cartFs)

//Persistencia de mongoDB
connectDB();

const productDao = new ProductsMongo();
const cartDao = new CartsMongo();
const usersDao = new UsersMongo();

export { productDao, cartDao, usersDao };
