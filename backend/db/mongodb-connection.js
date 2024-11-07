import mongoose from "mongoose"

export const connectDB = async ()=>{

    try{
    console.log('mongo_uri:',process.env.MONGODB_URI)
     const dbConnect=   await mongoose.connect(process.env.MONGODB_URI)
     console.log('MongoDB connected: ', dbConnect.connection.host)

    } catch (err){
        console.log('Error connecting to MongoDB',err.message)

        //exit the process with status code 1 ---failure [ 0 = sucess]
        process.exit(1)
    }

}