import type { Knex } from "knex"
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname + "/.env" })

// TODO: remove hardcoded values
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "migrations"
    }
  }
}

export default config
