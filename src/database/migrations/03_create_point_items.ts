import Knex from 'knex'

export const up = async (knex: Knex) => {
  return knex.schema.createTable('point_items', table => {
    table.integer('point_id').unsigned()
    table.foreign('point_id').references('points.id')

    table.integer('item_id').unsigned()
    table.foreign('item_id', 'tunga').references('items.id')

    table.primary(['point_id', 'item_id'])
  })
}

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('point_items')
}
