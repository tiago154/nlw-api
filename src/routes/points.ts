import { Router } from 'express'
import { points } from '../controllers'
import multer from 'multer'
import { postValidate } from '../validators/points'
import { errors } from 'celebrate'
import uploadImage from '../middlewares/upload-image'

const router = Router()

router.get('/:id', points.show)
router.get('/', points.index)
router.post('/',
  multer().single('image'),
  postValidate,
  errors(),
  uploadImage,
  points.create)

export default router
