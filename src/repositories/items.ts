import knex from '../database/connection'

const TABLE = 'items'

const list = async () => {
  const items = await knex(TABLE).select('*')
  return items
}

const selectByPointId = async (pointId: number) => {
  return await knex(TABLE)
    .join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', pointId)
    .select(['id', 'title'])
}

export {
  list,
  selectByPointId
}
