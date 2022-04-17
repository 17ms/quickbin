import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("post", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique()
    table.timestamps(true, true)
    table.string("title").nullable()
    table.string("content").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("post")
}
