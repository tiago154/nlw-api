import { Router } from 'express'
import { points } from '../controllers'

const router = Router()

router.get('/:id', points.show)
router.get('/', points.index)
router.post('/', points.create)

export default router
