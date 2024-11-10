import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userId)=>{

   const token = jwt.sign(
    //payload
    {
    userId 
    },

    //secret Key
    process.env.JWT_SECRET,
    
    //expiry Date
    {expiresIn: '7d'}
    );

    res.cookie("token",token, {
        httpOnly: true, // prevents XSS
        secure : process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000, //7 days
    })

    return token;

}