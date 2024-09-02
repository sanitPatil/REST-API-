import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'
import { config } from '../../config/config'

const ApiError = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    message: err.message,
    errorStack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default ApiError
