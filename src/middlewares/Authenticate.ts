import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../../config/config'

export interface AuthRequest extends Request {
  userId: string
}

const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return next(createHttpError(400, `Authorization token is required`))
    }
    //console.log(token)

    const parseToken = token?.split(' ')[1]
    //console.log(parseToken)
    const decode = jwt.verify(parseToken, config.JWT_SECRET as string) as
      | string
      | JwtPayload

    if (!decode) {
      return next(createHttpError(400, `token has expired`))
    }
    const id = (decode as JwtPayload)._id as string

    const _req = req as AuthRequest
    _req.userId = id

    next()
  } catch (err) {
    return next(createHttpError(500, `failed To Aithenticate ${err}`))
  }
}

export { Authenticate }
