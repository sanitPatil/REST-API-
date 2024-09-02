import express from 'express'
import { userRegister } from '../controllers/user.controller'
const userRouter = express.Router()

userRouter.route('/register').post(userRegister)

export default userRouter
