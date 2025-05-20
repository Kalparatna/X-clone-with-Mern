import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import serverless from 'serverless-http'

import authRoutes from '../routes/auth.route.js'
import userRoutes from '../routes/user.route.js'
import postRoutes from '../routes/post.route.js'
import notificationRoutes from '../routes/notification.route.js'
import connectDB from '../db/connectDB.js'

dotenv.config()

const app = express()

// Connect DB
connectDB()

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Middleware
app.use(cors({
  origin: ['https://frontendurl.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}))
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes)

// Export serverless handler
export const handler = serverless(app)
