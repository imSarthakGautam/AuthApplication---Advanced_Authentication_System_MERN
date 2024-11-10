import express from 'express';
import dotenv from "dotenv"


const app = express()

import { connectDB} from './db/mongodb-connection.js'
import authRoutes from './routes/authRoute.js'

dotenv.config();
//console.log(process.env.PORT)
const port = process.env.PORT || 3000;

app.use(express.json()) // allows to parse incoming requests with JSON payloads : req.body

//routes
app.get('/',(req,res)=>{
    res.send('Hi')
})

app.use('/api/auth', authRoutes)



app.listen(port, ()=>{
    connectDB()
    console.log(process.env.PORT)
    console.log('Server is running on port', port, `at http://localhost:${port}/`)
}) 