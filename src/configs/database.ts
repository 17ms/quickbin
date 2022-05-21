import knex from "knex"
import config from "./knexfile"

const knexConfig = config["development"]

const database = knex(knexConfig)

export default database
