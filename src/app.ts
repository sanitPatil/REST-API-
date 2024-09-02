import express from 'express'
const app = express()

app.get('/', (req, res, next) => {
  res.json({
    message: 'ok',
  })
})
export default app
