import type { Knex } from "knex"
import "../utils/parseEnv"

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    }
  }
  //production: {
  //  client: "postgresql",
  //  connection: {
  //    database: "my_db",
  //    user: "username",
  //    password: "password"
  //  },
  //  pool: {
  //    min: 2,
  //    max: 10
  //  },
  //  migrations: {
  //    tableName: "knex_migrations"
  //  }
  //}
}

export default config
