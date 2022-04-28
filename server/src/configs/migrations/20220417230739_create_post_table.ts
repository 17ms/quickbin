import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("post", (table: Knex.TableBuilder) => {
    table.string("id").primary().notNullable().unique()
    table.timestamps(true, true)
    table.text("title").nullable()
    table.text("content").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("post")
}
