import knex from '../database/connection'

const TABLE = 'points'

// Separar insert do point_items
// Refatorar
const insert = async (point: any) => {
  const trx = await knex.transaction()

  const insertedId = await trx(TABLE).insert({
    image: point.image,
    name: point.name,
    email: point.email,
    whatsapp: point.whatsapp,
    latitude: point.latitude,
    longitude: point.longitude,
    city: point.city,
    uf: point.uf
  }).then(id => id[0]).catch(err => {
    trx.rollback()
    return err
  })

  if (insertedId.code)
    return insertedId

  const pointItems = point.items
    .map((itemId: number) => ({
      item_id: itemId,
      point_id: insertedId
    }))

  const result: number | any = await trx('point_items').insert(pointItems).then(id => id[0]).catch(err => {
    trx.rollback()
    return err
  })

  await trx.commit()

  if (!result.code) {
    return {
      id: insertedId,
      ...point
    }
  }

  return result
}

const select = async (id: number) => {
  return await knex(TABLE).where({ id }).first()
}

const byFilters = async (city: string, uf: string, itemsIds: number[]) => {
  const query = knex(TABLE)
    .join('point_items', 'points.id', 'point_items.point_id')
    .distinct()
    .select('points.*')

  if (city)
    query.where({ city })

  if (uf)
    query.where({ uf })

  if (itemsIds && itemsIds.length)
    query.whereIn('point_items.item_id', itemsIds)

  return await query
}

export {
  insert,
  select,
  byFilters
}
