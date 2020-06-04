import * as repo from '../repositories/points'
import * as repoItem from '../repositories/items'

const insertPoint = async (data: any) => {
  return await repo.insert(data)
}

const byId = async (id: number) => {
  const point = await repo.select(id)

  if (!point)
    return

  const items = await repoItem.selectByPointId(point.id)

  return {
    point,
    items: items.map(({ id, title }) => ({ id, title }))
  }
}

const byFilters = async (city: string, uf: string, items: string) => {
  const parsedItems = String(items).split(',').map(item => Number(item.trim())).filter(n => !Number.isNaN(n))

  const filteredPoints = await repo.byFilters(city, uf, parsedItems)

  return filteredPoints
}

export { insertPoint, byId, byFilters }
