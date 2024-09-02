import express from 'express'
import ApiError from './utils/ApiError'

const app = express()

app.get('/', (req, res, next) => {
  res.json({
    message: 'ok',
  })
})

app.use(ApiError)
export default app
