import pgPool from "../configs/pgPool"
import expressSession from "express-session"
import pgSession from "connect-pg-simple"
import dotenv from "dotenv"
import path from "path"

// not using connect-session-knex because of odd type-related problems
// might fix later as the current solution (knex + pg --> two pools) is messy

dotenv.config({ path: path.join(__dirname, "../..", ".env") })

const pgSessionStore = pgSession(expressSession)

const session = expressSession({
  store: new pgSessionStore({
    pool: pgPool,
    tableName: "sessions",
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
  }
})

export default session
