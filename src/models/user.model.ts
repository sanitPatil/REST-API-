import mongoos from 'mongoose'
import { User } from './user.types.model'

const userSchema = new mongoos.Schema<User>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoos.model<User>('User', userSchema)

// export const User = mongoos.model("User",userSchema, "authors") // the third arguments will override the name
