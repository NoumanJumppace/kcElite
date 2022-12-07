// Librarys
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import morganBody from 'morgan-body'
// import path from 'path'
// import { fileURLToPath } from 'url'
// DB Connection
import { connectDB, RunSeeder } from './DB/index.js'
// Routes
import { UserRouters } from './Router/User/UserRouters.js'
import { OtpRouters } from './Router/Auth/OtpRouters.js'
import { SubscriptionRouter } from './Router/User/SubscriptionRouter.js'
import { GradeRouter } from './Router/Admin/GradeRouter.js'
// Response Handler
import { ResHandler } from './Utils/ResponseHandler/ResponseHandler.js'
import { SubscripRouter } from './Router/Admin/SubscripRouter.js'
import { AuthRouters } from './Router/Auth/AuthRouters.js'
import { VideoCatagoryRouter } from './Router/Admin/VideoCatagoryRouter.js'
import { VideoRouter } from './Router/Admin/VideoRouter.js'

// export const filename = fileURLToPath(import.meta.url)
// export const dirname = path.dirname(filename)

export let app = express()

const API_PreFix = '/api/v1'
const API_PreFix_Admin = '/api/v1/admin'

app.use('src/Uploads', express.static(__dirname + '/Uploads'))

var corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('tiny'))

morganBody(app, {
    prettify: true,
    logReqUserAgent: true,
    logReqDateTime: true,
})
// Connect To Database
connectDB()
// Running Seeder
RunSeeder()

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' })
})
// API Routes
// Auth Routes
app.use(API_PreFix, AuthRouters)

// User Routes
app.use(API_PreFix, UserRouters)
app.use(API_PreFix, OtpRouters)
app.use(API_PreFix, SubscriptionRouter)
// Admin Routes
app.use(API_PreFix_Admin, GradeRouter)
app.use(API_PreFix_Admin, SubscripRouter)
app.use(API_PreFix_Admin, VideoCatagoryRouter)
app.use(API_PreFix_Admin, VideoRouter)

app.use(ResHandler)
