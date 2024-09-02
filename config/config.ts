import { config as conf } from 'dotenv'
conf()

const _config = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  NODE_ENV: process.env.NODE_ENV,
}

export const config = Object.freeze(_config)
