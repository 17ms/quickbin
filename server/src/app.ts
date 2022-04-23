import express from "express"
import postsRouter from "./routes/posts"
import indexRouter from "./routes/index"
import { apiGetErrorHandler } from "./middlewares/apiErrorHandler"
import morganLogger from "./middlewares/morganLogger"
import "dotenv/config"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use("/", indexRouter)
app.use("/posts", postsRouter)

app.use(morganLogger)
app.use(apiGetErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
