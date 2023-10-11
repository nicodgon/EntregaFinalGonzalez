import {faker, Faker,es,en} from "@faker-js/faker"

const {database,commerce,image,string,datatype}=faker

export const generateProducts=()=>{
  return {
    _id:database.mongodbObjectId(),
    title:commerce.productName(),
    description:commerce.productDescription(),
    price:parseInt(commerce.price({min:1, max:30, dec:0})),
    thumbnails:[image.url()],
    code:string.alphanumeric(10),
    stock:parseInt(string.numeric(2)),
    status:datatype.boolean(),
    category:commerce.product()
  }
}