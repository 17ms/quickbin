import express from "express"
import postsRouter from "./routes/posts"
import indexRouter from "./routes/index"
import "dotenv/config"
import { apiGetErrorHandler } from "./middlewares/apiErrorHandler"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use("/", indexRouter)
app.use("/posts", postsRouter)

app.use(apiGetErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
