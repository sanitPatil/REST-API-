import path from 'node:path'
import fs from 'node:fs'
import createHttpError from 'http-errors'
import bookModel from '../models/books.model/book.model'
import { Book } from '../models/books.model/book.types.model'
import express, { Request, Response, NextFunction } from 'express'
import cloudinary from '../utils/Cloudinary'
import { AuthRequest } from '../middlewares/Authenticate'
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre, description } = req.body
    if (!title || !genre || !description) {
      return next(createHttpError(400, 'All fields Are required'))
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    //console.log(files)

    // minetype -> application/pdf or image/jpeg ...
    const converImageMime = files.coverImage[0].mimetype.split('/').at(-1)
    const filename = files.coverImage[0].filename
    const filePath = path.resolve(
      __dirname,
      '../../public/data/uploads',
      filename,
    )
    //console.log('25 line' + filePath, filename, converImageMime)

    // upload coverImage on Cloudinary
    const upload_coverImage = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: 'book-cover',
      format: converImageMime,
    })
    //console.log(uploadRes)

    // check
    const bookFileName = files.file[0].filename
    //console.log(bookFileName)

    const bookFilePath = path.resolve(
      __dirname,
      '../../public/data/uploads',
      bookFileName,
    )
    //console.log(bookFilePath)

    // console.log(bookFileUploadRes)

    const upload_file = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: 'raw',
      filename_override: bookFileName,
      folder: 'book-pdfs',
      format: 'pdf',
    })
    //console.log(bookFileUploadResult)
    fs.unlinkSync(bookFilePath)
    fs.unlinkSync(filePath)
    //check
    const _req = req as AuthRequest
    //console.log(_req)

    const bookRes = await bookModel.create({
      title,
      description,
      author: _req.userId,
      genre,
      coverImage: upload_coverImage.secure_url,
      file: upload_file.secure_url,
    })

    if (!bookRes) {
      next(
        createHttpError(500, `something went wrong while uploading on cloud`),
      )
    }

    res.status(200).json({
      mes: 'ok',
    })
  } catch (err) {
    console.log(`Create Book Error::${err}`)
  }
}

export { createBook }
