import nodemailer from "nodemailer"
import {config} from "./config.js"

const gmailTransporter=nodemailer.createTransport({
  service:"gmail",
  port:587,
  auth:{
    user:config.gmail.acount,
    pass:config.gmail.password
  },
  secure:false,
  tls:{
    rejectUnauthorized:false
  }
})

export {gmailTransporter}