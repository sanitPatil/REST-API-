import path from 'node:path'
import fs from 'node:fs'
import createHttpError from 'http-errors'
import bookModel from '../models/books.model/book.model'
import { Book } from '../models/books.model/book.types.model'
import express, { Request, Response, NextFunction } from 'express'
import cloudinary from '../utils/Cloudinary'
import { AuthRequest } from '../middlewares/Authenticate'
import userModel from '../models/user.model/user.model'
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

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre, description } = req.body
    const { bookid } = req.params
    //console.log(bookid)

    const _req = req as AuthRequest
    const userId = _req.userId

    const bookupdate = await bookModel.findOne({ _id: bookid })

    if (bookupdate?.author.toString() !== userId) {
      return next(createHttpError(403, `Un-Authorized Access.`))
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    let completedCoverImage = ''
    if (files.coverImage) {
      const fileName = files.coverImage[0].filename
      const coverImageMimeTime = files.coverImage[0].mimetype.split('/').at(-1)
      const filePath = path.resolve(
        __dirname,
        '../../public/data/uploads/' + fileName,
      )

      const res = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: 'book-cover',
        format: coverImageMimeTime,
      })

      completedCoverImage = res.secure_url
      fs.unlinkSync(filePath)
    }

    let completeFile = ''
    if (files.file) {
      const filename = files.file[0].filename
      const filePath = path.resolve(
        __dirname,
        '../../public/data/uploads/',
        filename,
      )

      const res = await cloudinary.uploader.upload(filePath, {
        resource_type: 'raw',
        folder: 'book-pdfs',
        filename_override: filename,
        format: 'pdf',
      })
      completeFile = res.secure_url
      fs.unlinkSync(filePath)
    }

    const temp_coverImage = bookupdate.coverImage
    const temp_file = bookupdate.file

    const bookRes = await bookModel.findOneAndUpdate(
      { _id: bookupdate._id },
      {
        title: title ? title : bookupdate.title,
        genre: genre ? genre : bookupdate.genre,
        description: description ? description : bookupdate.description,
        author: userId,
        coverImage: completedCoverImage
          ? completedCoverImage
          : bookupdate.coverImage,
        file: completeFile ? completeFile : bookupdate.file,
      },
      {
        new: true,
      },
    )

    if (!bookRes) {
      return next(createHttpError(500, `failed to store on cloud `))
    }
    const cover = temp_coverImage.split('/')
    const coverPublicId = cover.at(-2) + '/' + cover.at(-1)

    const file = temp_file.split('/')
    const filePublicId = file.at(-2) + '/' + file.at(-1)

    await cloudinary.uploader.destroy(coverPublicId)
    await cloudinary.uploader.destroy(filePublicId)
    return res.status(200).json({
      message: 'ok',
      bookRes,
    })
  } catch (err) {
    throw createHttpError(500, `failed to update book ${err}`)
  }
}

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.params
    if (!bookId) {
      return next(createHttpError(400, 'book id required '))
    }

    const bookRes = await bookModel.findOne({ _id: bookId })

    if (!bookRes) {
      return next(createHttpError(404, 'book not found '))
    }

    return res.status(200).json({
      message: 'ok',
      bookRes,
    })
  } catch (err) {
    return next(createHttpError(500, `failed to get book${err}`))
  }
}

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookRes = await bookModel.find()
    if (!bookRes) return next(createHttpError(500, `failed to load`))
    return res.status(200).json({
      message: 'ok',
      bookRes,
    })
  } catch (err) {
    return next(createHttpError(500, `failed to load all books${err}`))
  }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params
    if (!bookId) return next(createHttpError(400, `please provide book id`))
    //console.log(bookId)

    const bookRes = await bookModel.findOne({ _id: bookId })
    if (!bookRes) return next(createHttpError(404, `book not found`))

    const _req = req as AuthRequest

    if (bookRes.author.toString() !== _req.userId) {
      return next(createHttpError(404, `UnAuthorized access prohibited`))
    }
    //console.log(bookRes)

    const coverImage = bookRes.coverImage.split('/')
    const coverImagePublicId = coverImage.at(-2) + '/' + coverImage.at(-1)

    // https://res.cloudinary.com/dgm1vt7qt/image/upload/v1725556576/book-covers/bfoxt0anz1ie9uynsi5i.jpg
    //https://res.cloudinary.com/dgm1vt7qt/raw/upload/v1725556578/book-pdfs/e5gjgemfokgy0xg1ducj.pdf

    // console.log(typeof filePublicId)
    const bookFileSplits = bookRes.file.split('/')
    const bookFilePublicId = bookFileSplits.at(-2) + '/' + bookFileSplits.at(-1)
    //console.log('bookFilePublicId', bookFilePublicId)

    await cloudinary.uploader.destroy(coverImagePublicId)
    await cloudinary.uploader.destroy(bookFilePublicId)

    const delRes = await bookModel.deleteOne({ _id: bookId })
    //console.log(delRes)

    res.status(204)
  } catch (err) {
    return next(createHttpError(500, `failed to delete book::${err}`))
  }
}

export { createBook, updateBook, getSingleBook, getAllBooks, deleteBook }
