import winston from "winston"
import dotenv from "dotenv"
dotenv.config()

const currentEnv = process.env.NODE_ENV

const customLevelsOptions = {
  levels:{
    fatal: 0,
    error:1,
    warning:2,
    info:3,
    http:4,
    debug:5
  }
}

const devLogger = winston.createLogger({
  levels:customLevelsOptions.levels,
	transports:[
	new winston.transports.Console({level:"debug"})
	]
})

const prodLogger = winston.createLogger({
  levels:customLevelsOptions.levels,
	transports:[
	new winston.transports.Console({level:"info"}),
	new winston.transports.File({filename:"./logs/errors.log",level:"error"})
	]
})

export const addLogger=()=>{
  let logger;
  if(currentEnv === "development"){
    logger = devLogger
  }else{
    logger = prodLogger
  }
  return logger
}