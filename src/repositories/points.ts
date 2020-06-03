import knex from '../database/connection'

const TABLE = 'points'

// Separar insert do point_items
// Refatorar
const insert = async (point: any) => {
  const trx = await knex.transaction()

  const insertedId = await trx(TABLE).insert({
    image: 'image-fake',
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

  const pointItems = point.items.map((itemId: number) => ({
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
  return await knex(TABLE)
    .join('point_items', 'points.id', 'point_items.point_id')
    .whereIn('point_items.item_id', itemsIds)
    .where({ city })
    .where({ uf })
    .distinct()
    .select('points.*')
}

export {
  insert,
  select,
  byFilters
}
