export const config = {
  server: {
    port: 8080,
    secretSession: "adminCod3r123",
  },
  fileSystem: {
    productsFs: "src/data/products.json",
    cartFs: "src/data/carts.json",
  },
  mongo: {
    url: "mongodb+srv://nicolasdg19:g8my3m9t@cluster0.43j432j.mongodb.net/ecommerce?retryWrites=true&w=majority",
  },
  github: {
    clientID: "Iv1.bdbf94dffacf26d1",
    clientSecret: "ef73a3eab3b7ce306e929dd3da6c97f8ea31e53f",
    callbackUrl: "http://localhost:8080/api/sessions/github-callback",
  },
};
