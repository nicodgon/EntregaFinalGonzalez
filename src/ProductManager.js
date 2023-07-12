import fs from "fs"

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    addProduct(prod){
        try {
            // Leer el arhivo y guardar en una variable
            const contenido = fs.readFileSync(this.path,'utf-8');
            const productos= JSON.parse(contenido);
            // Declarar el id autoincrementable
            let id;
            if (!productos.length){
                id = 1;
            } else {
                id=productos[productos.length-1].id+1;
            }
            // agregar id al objeto
            prod.id = id
            // Comparar que ningúna propiedad de ningún objeto esté repetida
            const compareProd= productos.some(e=>{
                return e.title === prod.title,
                e.description === prod.description,
                e.price === prod.price,
                e.thumbnails === prod.thumbnails,
                e.code === prod.code,
                e.stock === prod.stock,
                e.status === prod.status,
                e.category === prod.category
            })
            // Agregar al json
            // Si existen las propiedades y no son todas repetidas se agregar al array sino aparece un error en consola
            if (prod.title,prod.description,prod.price,prod.thumbnails,prod.code,prod.stock,prod.status, prod.category && !compareProd){
                productos.push(prod);
                fs.writeFileSync(this.path,JSON.stringify(productos,null,'\t'));
            } else {
                console.log('Error, all properties are required and must not be repeated')
            }
        }catch(error){
            console.log(error.message);
        }
    }
    getProducts(limit){
        try{
            const contenido =  fs.readFileSync(this.path,"utf-8");
            const contenidoJson = JSON.parse(contenido);
            if(limit){
                const compareId = contenidoJson.filter(e=>e.id <= limit);
                return compareId
            }else{
                return contenidoJson;
            }
        }catch(error){
            console.log(error.message);
            return undefined;
        }
    }
    getProductById(id){
        try{
            const contenido = fs.readFileSync(this.path,"utf-8");
            const productos = JSON.parse(contenido);
            const compareId = productos.find(e=>e.id == id);
            if(!compareId){
                return console.log('Error: the object with the specified id does not exist')
            }else{
                return compareId
            };
        }catch(error){
            console.log(error.message);
        }
    }
    updateProduct(id,prod){
        try{
            // Leer y parsear el archivo
            const contenido = fs.readFileSync(this.path,'utf-8');
            const productos = JSON.parse(contenido);
            // Buscar el producto a traves del id
            const compareId = productos.find(e=>e.id == id);
            const index = productos.indexOf(compareId);
            const prodFind = productos[index];
            // Actualizar el producto
            function update (prodFind,prod){
                prodFind.title = prod.title;
                prodFind.description = prod.description;
                prodFind.price = prod.price;
                prodFind.thumbnails = prod.thumbnails;
                prodFind.code = prod.code;
                prodFind.stock = prod.stock;
                prodFind.status = prod.status;
                prodFind.category = prod.category;
            }
            update(prodFind,prod);
            fs.writeFileSync(this.path,JSON.stringify(productos,null,'\t'));
        }catch(error){
            console.log(error.message);
        }
    }
    deleteProduct(id){
        try{
            const contenido = fs.readFileSync(this.path,'utf-8');
            const productos = JSON.parse(contenido);
            const compareId = productos.find(e=>e.id == id);
            const index = productos.indexOf(compareId);
            productos.splice(index, 1);
            fs.writeFileSync(this.path,JSON.stringify(productos,null,'\t'));
        }catch(error){
            console.log(error.message);
        }
    }
    existProduct(id){
        try{
            const contenido = fs.readFileSync(this.path,"utf-8");
            const productos = JSON.parse(contenido);
            const compareId = productos.find(e=>e.id == id);
            if(compareId){
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.log(error.message);
        }
    }
}