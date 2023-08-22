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
};
