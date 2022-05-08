import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table: Knex.TableBuilder) => {
      table.uuid("id").primary().notNullable().unique()
      table.string("email", 255).notNullable().unique()
      table.string("nickname", 255).notNullable()
      table.string("hash").notNullable()
      table.timestamps(true, true)
    })
    .createTable("posts", (table: Knex.TableBuilder) => {
      table.string("id").primary().notNullable().unique()
      table.timestamps(true, true)
      table.text("title").nullable()
      table.text("content").notNullable()
      table.uuid("owner").nullable().references("id").inTable("users")
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users")
}
