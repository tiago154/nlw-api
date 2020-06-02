import * as repo from '../repositories/points'
import * as repoItem from '../repositories/items'

const insertPoint = async (data: any) => {
  const ok = await repo.insert(data)
  return ok
}

const byId = async (id: number) => {
  const point = await repo.select(id)
  const items = await repoItem.selectByPointId(point.id)

  return {
    point,
    items
  }
}

const byFilters = async (city: string, uf: string, items: string) => {
  const parsedItems = String(items).split(',')
    .map(item => Number(item.trim()))
  const filteredPoints = await repo.byFilters(city, uf, parsedItems)

  return filteredPoints
}

export { insertPoint, byId, byFilters }
