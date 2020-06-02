import express from 'express'
import cors from 'cors'
import path from 'path'
import { users, healthCheck, items, points } from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use('/health-check', healthCheck)
app.use('/users', users)
app.use('/items', items)
app.use('/points', points)

export default app
