import assignLocals from "./src/middlewares/assignLocals"
import rateLimitConfig from "./src/configs/rateLimit"
import session from "./src/configs/session"
import indexRouter from "./src/routes/index"
import postsRouter from "./src/routes/posts"
import authRouter from "./src/routes/auth"
import logger from "./src/utils/winston"
import flash from "connect-flash"
import passport from "passport"
import express from "express"
import helmet from "helmet"
import https from "https"
import fs from "fs"
import "./src/configs/passport"
import "./src/utils/parseEnv"
import "./src/utils/cronDelete"

const app = express()
const port = process.env.PORT || 3000
const privKey = fs.readFileSync("./key.pem")
const certificate = fs.readFileSync("./cert.pem")

app.set("view engine", "ejs")
app.use(session)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())

app.use(assignLocals)

app.use("/posts", rateLimitConfig)
app.use("/auth", rateLimitConfig)

app.use("/", indexRouter)
app.use("/posts", postsRouter)
app.use("/auth", authRouter)

https
  .createServer({ key: privKey, cert: certificate }, app)
  .listen(port, () => {
    logger.log("info", `Server listening on port ${port}`)
  })
