import express from "express"
import postsRouter from "./routes/posts"
import indexRouter from "./routes/index"
import authRouter from "./routes/auth"
import morganLogger from "./middlewares/morganLogger"
import pgSession from "./middlewares/expressSession"
import strategy from "./middlewares/passportAuth"
import httpsRedirect from "express-http-to-https"
import passport from "passport"
import "dotenv/config"

const app = express()
const port = process.env.PORT || 4000

passport.use(strategy)

app.use(pgSession)
app.use(express.json())
app.use(httpsRedirect.redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/])) // skips localhost & /insecure
app.use(passport.initialize())
app.use(passport.session())

// TODO: add express-session + an alternative to connect-session-knex (doesn't work for some reason)

app.use("/", indexRouter)
app.use("/posts", postsRouter)
app.use("/auth", authRouter)

app.use(morganLogger)

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
