import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import serverless from 'serverless-http'

import connectDB from '../db/connectDB.js'
import authRoutes from '../routes/auth.route.js'
import userRoutes from '../routes/user.route.js'
import postRoutes from '../routes/post.route.js'
import notificationRoutes from '../routes/notification.route.js'

dotenv.config()

const app = express()

// Connect to DB
let isConnected = false
const connectToDB = async () => {
  if (!isConnected) {
    await connectDB()
    isConnected = true
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(cors({
  origin: ['https://frontendurl.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}))

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes)

export const handler = serverless(async (req, res) => {
  try {
    await connectToDB()
    return app(req, res)
  } catch (error) {
    console.error('Serverless handler error:', error)
    res.status(500).send('Internal Server Error')
  }
})
