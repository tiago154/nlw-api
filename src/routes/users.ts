import { Router } from 'express'
import { users } from '../controllers'

const router = Router()

router.get('/', users.index)
router.get('/:id', users.show)
router.post('/', users.create)

export default router
