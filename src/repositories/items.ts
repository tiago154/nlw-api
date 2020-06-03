import knex from '../database/connection'
import { Items } from '../models/Items'

const TABLE = 'items'

const list = async (): Promise<Items[]> => {
  const items = await knex(TABLE).select('*')
  return items
}

const selectByPointId = async (pointId: number): Promise<Items[]> => {
  return await knex(TABLE)
    .join('point_items', 'items.id', 'point_items.item_id')
    .where('point_items.point_id', pointId)
    .select(['id', 'title', 'image'])
}

export {
  list,
  selectByPointId
}
