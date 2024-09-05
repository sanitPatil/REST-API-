import express from 'express'
import path from 'node:path'
import { createBook } from '../controllers/book.controller'
import multer from 'multer'

import { Authenticate } from '../middlewares/Authenticate'
const bookRouter = express.Router()
const uplaod = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: { fileSize: 3e7 }, // 10mb -> 10*1024*1024
})
bookRouter.route('/create-book').post(
  Authenticate,
  uplaod.fields([
    { name: 'file', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  createBook,
)


export default bookRouter
