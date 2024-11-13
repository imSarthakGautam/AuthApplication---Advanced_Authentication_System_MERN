import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import {Navigate, Route, Routes} from 'react-router-dom'
import EmailVerificationPage from './pages/EmailVerificationPage';
import toast,{Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import DashboardPage from './pages/DashboardPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoadingSpinner from './components/LoadingSpinner';


function RedirectAuthenticatedUser({children}){
  const {user, isAuthenticated}=useAuthStore()
  if(isAuthenticated && user.isVerified){
    return <Navigate to ='/' replace />
  }
  return children;
}

function ProtectedRoute({children}){
  const {user, isAuthenticated}=useAuthStore()
  if(!isAuthenticated){
    return <Navigate to ='/login' replace />
  }

  if(!user.isVerified){
    return <Navigate to ='/verify-email' replace />
  }

  return children;
}


function App() {


  //--------------Authentication check
  const {isCheckingAuth, checkAuth, isAuthenticated, user }=useAuthStore()
  useEffect(() => {
    checkAuth()
    
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner/>
  console.log('user:',user)
  console.log('isAuthenticated:', isAuthenticated)
  //---------------------

  return (
    <div className='min-h-screen bg-gradient-to-br bg-gray-900 text-white flex item-center justify-center relative overflow-hidden'>

     <Routes>
        <Route path='/' 
            element={
                  <ProtectedRoute>
                    <DashboardPage/>
                  </ProtectedRoute>
            } 
        />

        <Route path='/signup' 
          element={
              <RedirectAuthenticatedUser>
                <SignupPage/>
              </RedirectAuthenticatedUser>
          } 
        />

        <Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route path='/verify-email' element={<EmailVerificationPage/>} />

        <Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

        <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

        {/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
     </Routes>

     <Toaster
      position="top-center"
      reverseOrder={false}
     />



    </div>
  )
}

export default App;
