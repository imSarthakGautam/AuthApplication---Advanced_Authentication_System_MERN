import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../store/authStore";


const SignupPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
  
  const {signup, error, isLoading}= useAuthStore()

	//const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();
        

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
        
	};
	return (
        
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl p-6 sm:p-10 bg-gray-800 bg-opacity-90
                   backdrop-filter backdrop-blur-md rounded-xl shadow-2xl mx-auto mt-24 mb-48 border border-gray-700"
        >

        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 
                         text-transparent bg-clip-text">
            Sign Up
          </h2>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-4 px-4  bg-gray-900 text-white text-xl placeholder-gray-400 rounded-lg 
                         focus:ring-emerald-500 focus:border-emerald-500"
            />
      
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
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
      
            <div className="mt-4">
              <PasswordStrengthMeter password={password} className="text-md text-gray-400" />
            </div>
      
            <motion.button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                         font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                         focus:ring-offset-gray-900 transition duration-200 text-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
            </motion.button>
          </form>
        </div>
      
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-md text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
      

		
	);
};
export default SignupPage;