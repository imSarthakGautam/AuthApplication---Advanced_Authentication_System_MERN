import express from 'express';
import dotenv from "dotenv"


const app = express()
import { connectDB} from './db/mongodb-connection.js'

app.get('/', (req,res)=>{
    res.send('Hi')
})

dotenv.config();

app.listen(3000, ()=>{
    connectDB()
    console.log('Server is running on port 3000')
}) 