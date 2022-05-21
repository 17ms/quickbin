import session from "express-session"
import "../utils/parseEnv"

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "sessionsecret",
  resave: false,
  saveUninitialized: false
  // TODO: add session-store for persistency despite restarts
})

export default sessionConfig
