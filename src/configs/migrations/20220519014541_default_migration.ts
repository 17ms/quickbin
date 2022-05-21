import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable("users", (table: Knex.TableBuilder) => {
      table.uuid("uid").primary().notNullable().unique()
      table.string("email").notNullable().unique()
      table.string("hash").notNullable()
      table.timestamps(true, true)
    })
    .createTable("posts", (table: Knex.TableBuilder) => {
      table.string("id").primary().notNullable().unique()
      table.text("title").nullable()
      table.text("content").notNullable()
      table.string("owner").nullable().references("email").inTable("users")
      table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("posts").dropTableIfExists("users")
}
