import { Request, Response } from 'express'

const index = (_req: Request, res: Response) => {
  return res.json({ status: 'up' })
}
export { index }
