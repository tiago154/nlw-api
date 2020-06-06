import { Request, Response } from 'express'
import { insertPoint, byId, byFilters } from '../services/points'

// Ajustar StatusCode
const create = async (req: Request, res: Response) => {
  const result = await insertPoint(req)

  if (result.code)
    return res.status(400).send(result)

  return res.json(result)
}

const show = async (req: Request, res: Response) => {
  const point = await byId(req)

  if (!point)
    return res.sendStatus(404)

  return res.json(point)
}

const index = async (req: Request, res: Response) => {
  const point = await byFilters(req)

  res.json(point)
}

export { create, show, index }
