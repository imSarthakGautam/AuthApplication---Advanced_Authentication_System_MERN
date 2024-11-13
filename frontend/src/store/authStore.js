
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
    }


}))
