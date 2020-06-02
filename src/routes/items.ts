import { Router } from 'express'
import { items } from '../controllers'

const router = Router()

router.get('/', items.index)

export default router
