import dotenv from "dotenv"
dotenv.config()

export const config = {
  server: {
    port: process.env.PORT || 8080,
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
  gmail:{
    acount:process.env.GMAIL_SALES,
    password:process.env.GMAIL_SALES_PASSWORD,
    secretToken:process.env.SECRET_TOKEN_EMAIL
  }
};
