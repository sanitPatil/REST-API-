import { config } from './config/config'
import app from './src/app'

const PORT = config.PORT || 3000

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
  })
}

startServer()
