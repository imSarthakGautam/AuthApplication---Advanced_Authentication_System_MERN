import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Route, Routes} from 'react-router-dom'
import EmailVerificationPage from './pages/EmailVerificationPage';
import toast,{Toaster} from 'react-hot-toast'
function App() {
  /*
  
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/verify-email', verifyEmail)

  */

  return (
    <div className='min-h-screen bg-gradient-to-br bg-gray-900 text-white flex item-center justify-center relative overflow-hidden'>

     <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />
        <Route path='/reset-password' element={'Reset Password Page'} />
        <Route path='/forgot-password' element={'Forgot Password Page'} />
     </Routes>
     <Toaster
      position="top-center"
      reverseOrder={false}
     />



    </div>
  )
}

export default App;
