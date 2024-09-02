import express from 'express'
import { userRegister, userLogin } from '../controllers/user.controller'
const userRouter = express.Router()

userRouter.route('/register').post(userRegister)
userRouter.route('/login').post(userLogin)
export default userRouter
