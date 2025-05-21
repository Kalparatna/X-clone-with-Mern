import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'

import connectDB from './db/connectDB.js'

dotenv.config()

const app = express() // ✅ DEFINE app first

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

// ✅ CORS middleware — use after app is defined
app.use(cors({
  origin: ['http://localhost:5173', 'https://x-clone-with-mern.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// ✅ Setup middleware
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// ✅ Connect routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/notifications", notificationRoutes)

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

// ✅ Catch-all for 404s
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ✅ Start server
app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server listening on port ${PORT}`)
})
