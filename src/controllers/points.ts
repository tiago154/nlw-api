import { Request, Response } from 'express'
import { insertPoint, byId, byFilters } from '../services/points'

// Ajustar StatusCode
const create = async (req: Request, res: Response) => {
  const data = req.body
  const result = await insertPoint(data)
  if (result.code) {
    return res.status(400).json({ items: 'There are one or more items that do not exist' })
  }
  return res.json(result)
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params
  const point = await byId(Number(id))
  return res.json(point)
}

const index = async (req: Request, res: Response) => {
  const { city, uf, items } = req.query
  const point = await byFilters(city as string, uf as string, items as string)

  res.json(point)
}

export { create, show, index }
