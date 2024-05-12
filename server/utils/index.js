import express from 'express';
import connectDB from '../config/connectDB.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from '../routes/user.routes.js';
import { errorHandler, notFound } from '../middlewares/errorHandler.js';
dotenv.config()

const port = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({ message: "API IS WORKING FINE" })
})

app.use("/api/v1/users", userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
    await connectDB()
})