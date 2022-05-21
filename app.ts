import session from "./src/configs/session"
import assignLocals from "./src/middlewares/assignLocals"
import indexRouter from "./src/routes/index"
import postsRouter from "./src/routes/posts"
import authRouter from "./src/routes/auth"
import express from "express"
import flash from "connect-flash"
import passport from "passport"
import "./src/configs/passport"
import "./src/utils/parseEnv"

const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(session)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(assignLocals)

app.use("/", indexRouter)
app.use("/posts", postsRouter)
app.use("/auth", authRouter)

// TODO: add proper logging

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
