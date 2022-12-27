import session from "express-session"
import "../utils/parseEnv"

// TODO: configure redis to store sessions

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "sessionsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
  }
})

export default sessionConfig
