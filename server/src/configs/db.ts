import knex from "knex"
import config from "./knexfile"

const dbConfig = config[process.env.NODE_ENV || "development"]

const db = knex(dbConfig)

export default db
