import express from "express"
import postsRouter from "./routes/posts"
import indexRouter from "./routes/index"
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname + "/.env" })

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use("/", indexRouter)
app.use("/posts", postsRouter)

// DEFINE PORT
app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
