import { config as conf } from 'dotenv'
conf()

const _config = {
  PORT: process.env.PORT,
  //mongo
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  //node
  NODE_ENV: process.env.NODE_ENV,
  // jwt
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIREIN: process.env.JWT_EXPIREIN,
  // api
  CLOUD_URL: process.env.CLOUD_NAME,
  CLOUD_API: process.env.CLOUD_API_KEY,
  CLOUD_API_KEY: process.env.CLOUD_API_SECRET,
}

export const config = Object.freeze(_config)
