import express from 'express'
const router = express.Router();
import { signup, login, logout, verifyEmail} from '../controllers/authController.js'


router.post('/signup', signup)
router.get('/signup', (req, res)=>{
    res.send('hi')
})
router.post('/login', login)
router.post('/logout', logout)

router.post('/verify-email', verifyEmail)


export default router;
//whenever you import this router elsewhere you can give this a name.