import dotenv from "dotenv"
dotenv.config()

export const config = {
  server: {
    port: process.env.PORT,
    secretSession: process.env.secretSession,
  },
  fileSystem: {
    productsFs: process.env.productsFs,
    cartFs: process.env.cartFs,
  },
  mongo: {
    url: process.env.url,
  },
  github: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackUrl: process.env.callbackUrl,
  },
};
