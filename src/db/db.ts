import mongoose from 'mongoose'
import { config } from '../../config/config'

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log(
        `mongo db connected successfully... ${mongoose.connection.host}`,
      )
    })
    mongoose.connection.on('error', (err) => {
      console.log(`Error in Connecting with DB ${err.message}`)
    })
    const conn = await mongoose.connect(`${config.MONGO_DB_URL}/elib`)
  } catch (err) {
    console.log(`Failed to Connect Database ${err}`)
    process.exit(1)
  }
}

export default connectDB
