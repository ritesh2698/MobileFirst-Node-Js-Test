import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { protect, admin } from './middleware/authMiddleware.js'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import Upload from './models/uploadModel.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/upload', protect, admin, uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', async (req, res) => {
  res.json({ success: true, message: 'Welcome to Home Page' })
})
app.get('/dashboard', protect, async (req, res) => {
  if(req.user == null ) return res.send({success:false,message:'Please provide valid token'})
  if (req.user.isAdmin || false) {
    res.send({ success: true, message: 'You can upload files' })
  } else {
    let images = await Upload.find({})
    res.send({ success: true, data: images })
  }
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
