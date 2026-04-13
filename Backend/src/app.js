import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))




import authRouter from './routes/auth.routes.js'






app.use('/api/auth', authRouter)


// Health Route
app.get('/', (req, res) => {
    res.send("Health Route")
})




export default app