import { Router } from 'express'
import { loginUserController, registerUserController } from '../controllers/auth.controller.js'
import { validateLoginUser, validateRegisterUser } from '../validator/auth.validator.js'

const authRouter = Router()


authRouter.post('/register', validateRegisterUser , registerUserController)


authRouter.post('/login', validateLoginUser, loginUserController)


export default authRouter