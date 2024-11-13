import {userModel} from '../models/userModel.js'
import bcryptjs from 'bcryptjs';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'

import {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import crypto from 'crypto'


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
            console.log('User already exists', userAlreadyExists);
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

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message:'user verified',
            user : {
                ...user._doc,
                password: undefined,
            }

        });
    
    
    } catch (error){
        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
    }
}

//---------- L O G I N ---------
export const login = async (req, res)=>{
    console.log('login triggered')
    let { email, password} = req.body
    const hashedPassword = await bcryptjs.hash(password, 10)
    try{
        // Find user by email
        let user = await userModel.findOne({ email });
        
        // Check if user exists and password is correct
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            console.log('username/pw incorrect')
            return res.status(400).json({ success: false, message: 'Username or Password incorrect' });
        }
        
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin= Date.now();
        await user.save()
        console.log('login success')
        res.status(200).json({
            success:true,
            message: "login successful",
            user : {
                ...user._doc,
                password: undefined,
            }

        });
        
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


//----------f o r g o t  p / w -------------
export const forgotPassword = async (req, res)=>{
    //console.log('inside forgot password')
    const {email }= req.body
    try{
        let user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        //generating reset token
        const resetToken= crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt= Date.now() + 60*60*1000 //1hr

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt =resetTokenExpiresAt
        await user.save();

        //send password reset email
        //instead of giving reset p/w token redirect to page with token in URL
        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)



        
        res.status(200).json({
            success: true,
            message: 'Password reset link sent'
        })
    } catch (err){
        console.log('Forgot Password Error:', err.message)
    }
}



//---------- r e s e t   p / w -------------
export const resetPassword = async (req, res)=>{
    console.log('inside reset password')
    const {token}= req.params //--------- resetpw/:token
    const { password} = req.body
    try{

        let user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now()}
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Token Expired or doesn't exists" });
        }


        user.password=await bcryptjs.hash(password, 10)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save()

        //send password reset successful email
        await sendResetPasswordSuccessEmail(user.email)
        return res.status(200).json({
            success: true,
            message: 'Password reset successful'
        })

    } catch (err){
        console.log('Reset Password Error:', err.message)
    }
}

//----check auth--
export const checkAuth = async (req, res)=>{
    console.log('inside check Auth')
   
    try{

        let user = await userModel.findById (req.userId).select("-password");
        console.log(user)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

       
        return res.status(200).json({
            success: true,
            user       
         })

    } catch (err){
        console.log('Auth check Error:', err.message)
        res.status(500).json({ success: false, message: "Server error: authCheck" });
    }
}
