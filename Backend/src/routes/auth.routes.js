import { Router } from 'express'
import { getMe, googleCallback, loginUserController, registerUserController } from '../controllers/auth.controller.js'
import { validateLoginUser, validateRegisterUser } from '../validator/auth.validator.js'
import passport from 'passport'
import { authenticateUser } from '../middlewares/auth.middleware.js'

const authRouter = Router()


authRouter.post('/register', validateRegisterUser , registerUserController)


authRouter.post('/login', validateLoginUser, loginUserController)



authRouter.get('/me', authenticateUser, getMe)


authRouter.get('/google', passport.authenticate("google", { scope: [ "profile", "email" ] }))


authRouter.get('/google/callback', passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }), googleCallback)


export default authRouter