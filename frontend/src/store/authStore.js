
import {create} from 'zustand'
// for making HTTP requests
import axios from 'axios'

const API_URL='http://localhost:3000/api/auth'

axios.defaults.withCredentials= true;

export const useAuthStore = create((set)=>({


    //states: initial
    user:null,
    isAuthenticated: false,
    error: null,
    code:null,
    isLoading: false,
    isCheckingAuth: true, // to display signup or login


    //functions
    signup: async(email, password, name)=>{
        set({isLoading:true, error:null});
        try{
            console.log('inside try block : signup')
            const response= await axios.post(`${API_URL}/signup`, {email, password, name});
            console.log('response')
            set({user: response.data.user, isLoading:false})
        } catch (error){
            console.log('error in signup: store')

            set({error: error.response?.data?.message || 'error signing up', isLoading:false})
            throw error;
        }
    },

    login: async (email, password)=>{
        set({isLoading: true, error:null})
        try{
            console.log('Login message sent')
            const response = await axios.post(`${API_URL}/login`, {email, password});
            console.log('login response 02', response.data.message)
            set({
                 isAuthenticated:true,
                 user: response.data.user,
                 isLoading:false, 
                 error:null
                })

        } catch(error) {
            console.log('Error in login : store')
            set({error: error.response?.data?.message || 'error signing up', isLoading:false})
            throw error;

        }
    },

    verifyEmail : async(code)=>{
        set({isLoading:true, error:null});
        try{
            //verify-email ma 
            console.log('inside try block : verify-email')
            const response= await axios.post(`${API_URL}/verify-email`, {code});
            console.log('response: verify-email recieved', response.data)
            set({user: response.data.user, isLoading:false, isAuthenticated: true})
            return response.data;

        } catch(error){
            console.log('Error in verifyemail: store')
            set({error: error.response?.data?.message || 'error verifying email', isLoading:false})
            throw error;

        }
    },

    forgotPassword: async(email)=>{
        set({isLoading:true, error:false})
        try{
            console.log('inside forgot password 01')
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            set({isLoading:false})
        } catch(err){
            console.log('error in forgot pw')
        }

    },

    resetPassword: async(password, resetToken)=>{
        try{
            const response = await axios.post(`${API_URL}/reset-password/${resetToken}`, {password,cpassword});
            console.log('Password reset successful')
            set({user: response.data.user, isLoading:false})

        } catch (err){
            console.log(err)
        }

    },

    checkAuth: async ()=>{
        await new Promise((resolve)=>{setTimeout(resolve,2000)})
        set({isCheckingAuth: true, error:null})
        try{
            const response= await axios.get(`${API_URL}/check-auth`);
            
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth:false})
            
            return response.data


        } catch (error){
            console.log('error in auth check: store')
            set({error: null, isCheckingAuth:false, isAuthenticated:false})
            

        }
    },

    logout: async()=>{
        set({ isLoading: true, error:null});
        try {
            await axios.post(`${API_URL}/logout`);
                set({
                    user:null,
                    isAuthenticated:false,
                    error:null,
                    isLoading:false
                })
        } catch (error){
            set({
                
                error:'Error logging out',
                isLoading:false
            })
            throw err

        }

            
        },

    }
    


))
