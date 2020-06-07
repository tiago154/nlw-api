import { Request, Response, NextFunction } from 'express'
import { writeFile } from 'fs'
import { promisify } from 'util'
import path from 'path'
import crypto from 'crypto'

const writeFilePromise = promisify(writeFile)

export default async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req

  const hash = crypto.randomBytes(6).toString('hex')
  const filename = `${hash}-${file.originalname}`

  req.file.filename = filename

  const pathImage = path.resolve(process.cwd(), 'uploads', 'points', filename)

  return writeFilePromise(pathImage, file.buffer).then(() => next()).catch(() => res.status(500).json({ error: 'file upload failed' }))
}
