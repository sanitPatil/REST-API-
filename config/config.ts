import { config as conf } from 'dotenv'
conf()

const _config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
}

export const config = Object.freeze(_config)
