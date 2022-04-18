import express from "express"
import { router as indexRouter } from "./routes/index"
import { router as postsRouter } from "./routes/posts"

const app = express()

app.use(express.json())

app.use("/", indexRouter)
app.use("/posts", postsRouter)

// DEFINE PORT
app.listen(3000, () => {
  console.log("App listening on port 3000...")
})
