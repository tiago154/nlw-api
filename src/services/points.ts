import * as repo from '../repositories/points'
import * as repoItem from '../repositories/items'
import { Request } from 'express'
import buildUrlImage from '../util/image-url-builder'

const insertPoint = async ({ body, file, hostname, protocol }: Request) => {
  const itemsParsed = body.items
    .split(',')
    .map((item: string) => Number(item.trim()))

  const point = {
    ...body,
    items: itemsParsed,
    image: file.filename
  }
  const pointsDb = await repo.insert(point)
  return {
    ...pointsDb,
    image: buildUrlImage(protocol, hostname, 'uploads/points', pointsDb.image)
  }
}

const byId = async ({ params, hostname, protocol }: Request) => {
  const point = await repo.select(Number(params.id))

  if (!point)
    return

  const items = await repoItem.selectByPointId(point.id)

  return {
    point: {
      ...point,
      image: buildUrlImage(protocol, hostname, 'uploads/points', point.image)
    },
    items: items.map(({ id, title }) => ({ id, title }))
  }
}

const byFilters = async ({ query, hostname, protocol }: Request) => {
  const { city, uf, items } = query
  const parsedItems = String(items).split(',').map(item => Number(item.trim())).filter(n => !Number.isNaN(n))

  const filteredPoints = await repo.byFilters(city as string, uf as string, parsedItems)

  return filteredPoints.map((point: any) => ({
    ...point,
    image: buildUrlImage(protocol, hostname, 'uploads/points', point.image)
  }))
}

export { insertPoint, byId, byFilters }
