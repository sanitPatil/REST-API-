import { v2 as cloudinary } from 'cloudinary'
import { config } from '../../config/config'

cloudinary.config({
  cloud_name: config.CLOUD_URL,
  api_key: config.CLOUD_API,
  api_secret: config.CLOUD_API_KEY, // Click 'View API Keys' above to copy your API secret
})

export default cloudinary
