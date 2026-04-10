import cookieParser from 'cookie-parser'
import express from 'express'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())




import authRouter from './routes/auth.routes.js'






app.use('/api/auth', authRouter)


// Health Route
app.get('/', (req, res) => {
    res.send("Health Route")
})




export default app