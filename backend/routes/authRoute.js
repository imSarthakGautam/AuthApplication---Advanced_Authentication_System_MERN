import express from 'express'
const router = express.Router();
import { signup, login, logout} from '../controllers/authController.js'


router.get('/signup', signup)
router.get('/login', login)
router.get('/logout', logout)


export default router;
//whenever you import this router elsewhere you can give this a name.