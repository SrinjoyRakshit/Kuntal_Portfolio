import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import dbConnection from './database/dbConnection.js'
import { errorMiddleware } from './middlewares/error.js'
import messageRouter from './routes/message.route.js'
import userRouter from './routes/user.route.js'
import timelineRouter from './routes/timeline.route.js'
import applicationRouter from './routes/application.route.js'
import skillsRouter from './routes/skills.route.js'
import projectRouter from './routes/project.route.js'

const app = express()
dotenv.config({path: './config/config.env'})

app.use(cors({
    origin: [process.env.PORTFOLIO_URI, process.env.DASHBOARD_URI],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/timeline', timelineRouter)
app.use('/api/v1/softwareApplication', applicationRouter)
app.use('/api/v1/skill', skillsRouter)
app.use('/api/v1/project', projectRouter)

dbConnection()
app.use(errorMiddleware)

export default app