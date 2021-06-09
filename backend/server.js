import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorhandler.js'
import productRoutes from './routes/ProductRoutes.js'
import userRouter from './routes/UserRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Api is running..')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT} port`)
)