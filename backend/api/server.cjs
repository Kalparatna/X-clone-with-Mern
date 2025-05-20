const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const serverless = require('serverless-http')
const connectDB = require('../db/connectDB')

const authRoutes = require('../routes/auth.route')
const userRoutes = require('../routes/user.route')
const postRoutes = require('../routes/post.route')
const notificationRoutes = require('../routes/notification.route')

dotenv.config()

const app = express()

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
// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end())

module.exports.handler = serverless(async (req, res) => {
  try {
    await connectToDB()
    return app(req, res)
  } catch (error) {
    console.error('Serverless handler error:', error)
    res.status(500).send('Internal Server Error')
  }
})
