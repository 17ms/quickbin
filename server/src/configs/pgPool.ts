import pg from "pg"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../..", ".env") })

const pgPool = new pg.Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

export default pgPool
