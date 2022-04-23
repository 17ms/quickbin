import morgan, { StreamOptions } from "morgan"
import logger from "./winstonLogger"

const stream: StreamOptions = {
  write: (msg) => logger.http(msg)
}

const morganLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
)

export default morganLogger
