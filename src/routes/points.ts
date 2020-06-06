import { Router } from 'express'
import { points } from '../controllers'
import multer from 'multer'
import multerConfig from '../config/multer'

const upload = multer(multerConfig)
const router = Router()

router.get('/:id', points.show)
router.get('/', points.index)
router.post('/', upload.single('image'), points.create)

export default router
