import express from 'express'
import ApiError from './utils/ApiError'
import createHttpError from 'http-errors'
const app = express()

app.get('/', (req, res, next) => {
  const error = createHttpError(400, 'something went wrong')
  throw error
  res.json({
    message: 'ok',
  })
})

app.use(ApiError)
export default app
