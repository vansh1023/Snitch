import { Router } from 'express'
import { registerUserController } from '../controllers/auth.controller.js'
import { validateRegisterUser } from '../validator/auth.validator.js'

const authRouter = Router()


authRouter.use('/register', validateRegisterUser , registerUserController)


export default authRouter