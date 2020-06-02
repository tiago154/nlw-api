import { Router } from 'express'
import { healthCheck } from '../controllers'

const router = Router()

router.get('/', healthCheck.index)

export default router
