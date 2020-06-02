import { Request, Response } from 'express'

const users: string[] = [
  'astolfo',
  'balthazar',
  'cardoso'
]

const index = (req: Request, res: Response) => {
  const search = req.query.search as string
  const filteredUsers = search ? users.filter(user => user.includes(search)) : users

  return res.json(filteredUsers)
}

const show = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  return res.json(users[id] || {})
}

const create = (req: Request, res: Response) => {
  const { name } = req.body
  users.push(name)
  return res.json({ id: users.indexOf(name) })
}

export { index, show, create }
