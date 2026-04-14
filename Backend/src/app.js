import cookieParser from 'cookie-parser'
import express from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { config } from './config/config.js'
import cors from 'cors'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))





// Google auth setup

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))




import authRouter from './routes/auth.routes.js'






app.use('/api/auth', authRouter)




// Health Route
app.get('/', (req, res) => {
    res.send("Health Route")
})




export default app