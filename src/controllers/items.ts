import { Request, Response } from 'express'
import { listFormattedItems } from '../services/items'

const index = async (req: Request, res: Response) => {
  const items = await listFormattedItems(req.protocol, req.get('host') as string)
  return res.json(items)
}

export { index }
