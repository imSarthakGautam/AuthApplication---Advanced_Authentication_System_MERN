import express from 'express'
const router = express.Router();

import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/authController.js";

import {protectRoute} from '../middleware/protectRoute.js'

router.get('/check-auth', protectRoute, checkAuth)

router.post('/signup', signup)
router.get('/signup', (req, res)=>{
    res.send('hi')
})
router.post('/login', login)
router.post('/logout', logout)

router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/verify-email', verifyEmail)


export default router;
//whenever you import this router elsewhere you can give this a name.