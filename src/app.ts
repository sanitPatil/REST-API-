import express from 'express'
import ApiError from './utils/ApiError'
import userRouter from './routers/user.router'
import bookRouter from './routers/book.router'

const app = express()

// app.get('/', (req, res, next) => {
//   res.json({
//     message: 'ok',
//   })
// })

// build in middlewares
app.use(
  express.json({
    limit: '16kb',
  }),
)

app.use(
  express.urlencoded({
    extended: false,
  }),
)
// user router
app.use('/api/v1/users', userRouter)
// book router
app.use('/api/v1/books', bookRouter)
app.use(ApiError)
export default app
