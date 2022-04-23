import winston from "winston"
import "dotenv/config"

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const colours = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white"
}

const level = () => {
  const node_env = process.env.NODE_ENV || "development"
  const isDevelopment = node_env === "development"
  return isDevelopment ? "debug" : "info"
}

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      winston.format.colorize({ all: true }),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message || stack}`
      })
    )
  }),
  new winston.transports.File({
    filename: "./logs/error.log",
    level: "error",
    format: winston.format.json()
  })
]

winston.addColors(colours)

const logger = winston.createLogger({
  level: level(),
  levels,
  transports
})

export default logger
