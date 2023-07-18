import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(prod) {
    try {
      // valor por defecto de status
      if (!prod.status) {
        prod.status = true;
      }
      // Leer el arhivo y guardar en una variable
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(contenido);
      // Declarar el id autoincrementable
      let id;
      if (!productos.length) {
        id = 1;
      } else {
        id = productos[productos.length - 1].id + 1;
      }
      // agregar id al objeto
      prod.id = id;
      //introducir las rutas de imagenes a un array
      if (prod.thumbnails){
        const newThumbnails = [prod.thumbnails];
        prod.thumbnails = newThumbnails;
      }
      // Comparar que ningúna propiedad de ningún objeto esté repetida
      const compareProd = productos.some((e) => {
        return (
          e.title === prod.title,
          e.description === prod.description,
          e.price === prod.price,
          e.thumbnails === prod.thumbnails,
          e.code === prod.code,
          e.stock === prod.stock,
          e.status === prod.status,
          e.category === prod.category
        );
      });
      // Agregar al json
      // Si existen las propiedades y no son todas repetidas agregar al array. Sino aparece un error en consola
      if (
        prod.title &&
        prod.description &&
        prod.price &&
        prod.code &&
        prod.stock &&
        prod.status &&
        prod.category &&
        !compareProd
      ) {
        productos.push(prod);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async getProducts(limit) {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      const contenidoJson = JSON.parse(contenido);
      if (limit) {
        const compareId = contenidoJson.filter((e) => e.id <= limit);
        return compareId;
      } else {
        // si no se pasó un limite se devuelve el array completo
        return contenidoJson;
      }
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
  async getProductById(id) {
    try {
      const contenido =  await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(contenido);
      const compareId = productos.find((e) => e.id == id);
      if (!compareId) {
        return false;
      } else {
        return compareId;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async updateProduct(id, prod) {
    try {
      // Leer y parsear el archivo
      const contenido =  await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(contenido);
      // Buscar el producto a traves del id
      const compareId = productos.find((e) => e.id == id);
      if (
        prod.title &&
        prod.description &&
        prod.price &&
        prod.code &&
        prod.stock &&
        prod.status &&
        prod.category &&
        compareId
      ) {
        const index = productos.indexOf(compareId);
        const prodFind = productos[index];
        // Actualizar el producto
        function update(p, prod) {
          p.title = prod.title;
          p.description = prod.description;
          p.price = prod.price;
          p.thumbnails = [prod.thumbnails];
          p.code = prod.code;
          p.stock = prod.stock;
          p.status = prod.status;
          p.category = prod.category;
        }
        update(prodFind, prod);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteProduct(id) {
    try {
      const contenido =  await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(contenido);
      const compareId = productos.find((e) => e.id == id);
      if (compareId) {
        const index = productos.indexOf(compareId);
        productos.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async existProduct(id) {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(contenido);
      const compareId = productos.find((e) => e.id == id);
      if (compareId) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
