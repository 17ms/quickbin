import type { Knex } from "knex"

// TODO: remove hardcoded values
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: "quickbin-test",
      user: "postgres",
      password: ""
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
