// protect route by verifying token is valid or not
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export const protectRoute= (req, res, next)=>{
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({success: false, message: 'Unauthorized- no token provided'})
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) return res.status(401).json({success: false, message: 'Unauthorized- no token provided'})

        req.userId = decoded.userId
        next();
    
        //extract token from cookies

    } catch(err) {

        console.log('error is verifying token', err)
        return res.status(500).json({success: false, message: 'Server error'});

    }
   
}
