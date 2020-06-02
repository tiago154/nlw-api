import express from 'express'

const app = express()

app.get('/', (_req, res) => res.send('welcome'))

app.get('/users', (_req, res) => {
  res.json([
    'astolfo',
    'balthazar',
    'cardoso'
  ])
})

export default app
