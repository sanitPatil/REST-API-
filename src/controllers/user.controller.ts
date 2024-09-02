import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model'
import { User } from '../models/user.types.model'

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      const error = createHttpError(400, 'all Fields Required!!!')
      next(error)
    }

    const user = await userModel.find({ email })
    if (user) {
      const error = createHttpError(
        400,
        'User with email already Exist please Login!!!',
      )
      next(error)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    let newUser: User

    newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    })

    if (!newUser) {
      const error = createHttpError(
        500,
        'error while creating user please re-register!!!',
      )
      next(error)
    }

    res.status(200).json({
      message: 'success',
      id: newUser._id,
    })
  } catch (err) {
    next(`Error At User Register:: ${err}`)
  }
}

export { userRegister }
