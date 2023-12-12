export const createProductError = (prod)=>{
  return `
    Uno o mas campos son invalidos:
    Listado de campos requeridos:
    title: Este campo es obligatorio y de tipo String, el dato recibido fue ${prod.title}.
    description: Este campo es obligatorio y de tipo String, el dato recibido fue ${prod.description}.
    price: Este campo es obligatorio y de tipo Number, el dato recibido fue ${prod.price}.
    thumbnails: Este campo es obligatorio y de tipo String, el dato recibido fue ${prod.thumbnails}.
    code: Este campo es obligatorio y de tipo String, el dato recibido fue ${prod.code}.
    stock: Este campo es obligatorio y de tipo Number, el dato recibido fue ${prod.stock}.
    status: Este campo es obligatorio y de tipo Boolean, el dato recibido fue ${prod.status}.
    category: Este campo es obligatorio y de tipo String, el dato recibido fue ${prod.category}.
  `
}