import { Knex } from 'knex'

// prettier-ignore
export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username', 50).notNullable()
      table.string('password', 64).notNullable()
      table.string('email', 255).notNullable().unique()
      table.text('profile_pic').nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('category'))) {
    await knex.schema.createTable('category', table => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('book'))) {
    await knex.schema.createTable('book', table => {
      table.increments('id')
      table.string('book_title', 50).notNullable()
      table.text('book_description').notNullable()
      table.string('author', 50).notNullable()
      table.string('publisher', 255).notNullable()
      table.integer('rating').notNullable()
      table.text('book_image').notNullable()
      table.integer('price_in_cent').notNullable()
      table.integer('category_id').unsigned().notNullable().references('category.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('order'))) {
    await knex.schema.createTable('order', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.timestamp('order_date').notNullable()
      table.integer('book_id').unsigned().notNullable().references('book.id')
      table.timestamps(false, true)
    })
  }
}

// prettier-ignore
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order')
  await knex.schema.dropTableIfExists('book')
  await knex.schema.dropTableIfExists('category')
  await knex.schema.dropTableIfExists('user')
}
