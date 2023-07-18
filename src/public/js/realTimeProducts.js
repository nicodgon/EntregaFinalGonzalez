const socketClient=io()

//inputs
const title=document.getElementById('title');
const description=document.getElementById('description');
const code=document.getElementById('code');
const price=document.getElementById('price');
const status=document.getElementById('status')
const stock=document.getElementById('stock');
const category=document.getElementById('category');
//contenedor
const container=document.getElementById('container');
//boton
const btn=document.getElementById('btn');

btn.addEventListener('click',()=>{
  event.preventDefault()
  socketClient.emit("producto",{title:title.value,description:description.value,code:code.value,price:price.value,status:status.value,stock:stock.value,category:category.value});
})

socketClient.on("arrayProducts",(dataServer)=>{
  let elementContainer="";
  let id=-1
  dataServer.forEach(({title,description,code,price,status,stock,category}) => {
    id+=1
    elementContainer=elementContainer+
    `<li>Producto: ${title}</li>
    <li>Descripción: ${description}</li>
    <li>Codigo: ${code}</li>
    <li>Precio: ${price}</li>
    <li>status: ${status}</li>
    <li>Stock: ${stock}</li>
    <li>Categoría: ${category}</li>
    <li>Miniaturas: ['sin imagen']</li>
    <li>id:${id}</li>
    <br/>`
  });
  container.innerHTML=elementContainer
})