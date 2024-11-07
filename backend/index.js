import express from 'express';
import dotenv from "dotenv"


const app = express()

import { connectDB} from './db/mongodb-connection.js'
import authRoutes from './routes/authRoute.js'

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/auth', authRoutes)

dotenv.config();

app.listen(PORT, ()=>{
    connectDB()
    console.log('Server is running on port ', PORT)
}) 