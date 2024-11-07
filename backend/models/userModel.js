import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },

    lastLogin:{
        type:Date,
        default: Date.now()
    },
    isVerified:{
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, {timestamps: true})
//timestamps: true --> gives createdAt and UpdatedAt by default

export const userModel = mongoose.model('User', userSchema)
//User --> name of model, identifier of collection name in MongoDB- users