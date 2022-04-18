import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique()
    table.string("nickname").notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("post")
}
