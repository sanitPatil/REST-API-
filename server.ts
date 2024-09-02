import { config } from './config/config'
import app from './src/app'
import connectDB from './src/db/db'

const PORT = config.PORT || 3000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
  })
}

startServer()
