import React from 'react'
import Input from '../components/Input'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { motion } from "framer-motion";
import {Lock, Mail, Loader} from 'lucide-react'

function LoginPage() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //change
    const isLoading= false;

    const handleLogin =(ev)=>{
        ev.preventDefault;
    }
    

    return (
       <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl p-6 sm:p-10 bg-gray-800 bg-opacity-90
                 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl mx-auto mt-24 mb-48 border border-gray-700"
       >
            <div>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Login </h2>
                <form onSubmit={handleLogin}>
                    <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 px-4 text-md bg-gray-900 text-white placeholder-gray-400 rounded-lg 
                                focus:ring-emerald-500 focus:border-emerald-500"
                    />
            
                    <Input
                    icon={Lock}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 px-4 text-md bg-gray-900 text-white placeholder-gray-400 rounded-lg 
                                focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-md text-green-400 hover:underline'>
							Forgot password?
						</Link>
					</div>

                    <motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-xl text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
                        disabled={isLoading}
						
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
                </form>
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-md text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-green-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
            
       </motion.div>
    )

}

export default LoginPage;

