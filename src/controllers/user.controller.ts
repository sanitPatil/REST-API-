import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model/user.model'
import { User } from '../models/user.model/user.types.model'
import { config } from '../../config/config'
const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      const error = createHttpError(400, 'all Fields Required!!!')
      return next(error)
    }

    const user = await userModel.findOne({ email })
    if (user) {
      const error = createHttpError(
        400,
        'User with email already Exist please Login!!!',
      )
      return next(error)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    })

    if (!newUser) {
      return next(
        createHttpError(500, 'error while creating user please re-register!!!'),
      )
    }

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      config.JWT_SECRET as string,
      {
        expiresIn: config.JWT_EXPIREIN,
      },
    )

    return res.status(201).json({
      message: 'success',
      accessToken: token,
    })
  } catch (err) {
    next(`Error At User Register:: ${err}`)
  }
}

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(createHttpError(400, 'All fields Required!!!'))
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return next(createHttpError(404, 'User Not Found!!!'))
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return next(createHttpError(400, 'Invalid Password'))
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET as string, {
      expiresIn: config.JWT_EXPIREIN,
    })

    return res.status(200).json({
      message: 'sucessfully login',
      accessToken: token,
    })
  } catch (err) {
    console.log(`Error User Login::${err}`)
  }
}
export { userRegister, userLogin }
