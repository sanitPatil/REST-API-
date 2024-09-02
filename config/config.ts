import { config as conf } from 'dotenv'
conf()

const _config = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIREIN: process.env.JWT_EXPIREIN,
}

export const config = Object.freeze(_config)
