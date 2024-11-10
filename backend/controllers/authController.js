import {userModel} from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import {sendVerificationEmail} from '../mailtrap/emails.js'
//import { JsonWebTokenError } from 'jsonwebtoken';


//------- S I G N U P---------------
export const signup = async (req, res)=>{
    console.log(req.body)

    const { email, password, name} = req.body;
    try{
        //-- case : missing feilds------
        if (!email || !password || !name) {
            throw new Error('All feilds are required');
        }

        //------case: User already exists--------
        const userAlreadyExists = await userModel.findOne({email : req.body.email})

        if (userAlreadyExists) {
            console.log(userAlreadyExists)
            return res.status(400).json({success:false, message: "user already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationCode =  Math.floor(100000 + Math.random()* 900000).toString()
        const user = new userModel({
            email,
            password: hashedPassword,
            name,
            verificationToken : verificationCode,
            verificationTokenExpiresAt: Date.now() + 24* 60* 60 * 1000 //24hrs

        })
        await user.save();

        //jwt 
        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationCode )

        res.status(201).json({success: true,
             message:'User Created Successfully',
             user : {
                ...user._doc,
                password: undefined
             }
            })
        
    } catch (err){
        return res.status(400).json({success:false, message: err.message})
    }
}

//---------- v e r i f y   e m a i l ---------
export const verifyEmail = async (req, res)=>{
    console.log('inside verify email')

    const {code}= req.body
    try{
        const user = await userModel.findOne({
            verificationToken : code,
            verificationTokenExpiresAt: { $gt : Date.now() }
        });

        if (!user){
            return res.status(400).json({success: false, message: "Invalid or Expired VerificationToken"})
        }

        user.isVerified = true;
        user.verificationToken= undefined;
        user.verificationTokenExpiresAt= undefined;

        await user.save();
        res.status(200).json({
            success: true,
            message:'user verified',
            user : {
                ...user._doc,
                password: undefined,
            }

        });
    
    
    } catch (err){
        console.log('verify email:', err.message)
    }
}

//---------- L O G I N ---------
export const login = async (req, res)=>{
    let { email, password} = req.body
    const hashedPassword = await bcryptjs.hash(password, 10)
    try{
        // Find user by email
        let user = await userModel.findOne({ email });
        
        // Check if user exists and password is correct
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Username or Password incorrect' });
        }
        
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin= Date.now();
        await user.save()
        res.status(200).json({success:true, message: "login successful"})


        
    } catch (err){
        console.log('Login Error:', err.message)
    }
}

//----------L O G O U T-------------
export const logout = async (req, res)=>{
    console.log('inside logout')
    try{
        res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (err){
        console.log('Logout Error:', err.message)
    }
}
