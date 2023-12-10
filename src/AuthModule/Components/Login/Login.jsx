import React, { useContext, useState } from 'react'
import logo from "../../../assets/imgs/4 3.png"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'



export default function Login({saveUserData}) {
    const {register,handleSubmit,formState:{errors}}=useForm();
   const {baseUrl,requestHeaders}=useContext(AuthContext)
  const{getToastValue}= useContext(ToastContext)
    const navigate=useNavigate()
    const[isLoading,setIsLoading]=useState(false)
const Login =(data)=>{
axios.post(`${baseUrl}/Users/Login`,data)

.then((response)=>{
   
    localStorage.setItem("userToken",response?.data?.token)
    saveUserData()
    setIsLoading(true)
   
    navigate('/dashboard')
   
}).catch((error)=>{
    console.log(error);
    setIsLoading(false)
    getToastValue("error",error?.response?.data?.message);

})
}





  return (
    <div className="Auth-container">
      
            
        <div className="row bg-overlay  vh-100">
            <div className="col-md-6 m-auto">
                <div className="bg-white p-2" >
                    <div className="img text-center ">
                        <img src={logo} className='w-50' alt="logo" />
                    </div>
                  
                    <form className='w-75 m-auto' onSubmit={handleSubmit(Login)} >
              
                    <h3>Log In</h3>
                    <p className='text-color'>welcome Back!Please enter your details</p>
                        <div className="form-group my-3">
                        <input className='form-control email  px-4 ' type="email" placeholder='Enter your E-mail'
                        {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                         />
                         {errors.email&&errors.email.type==="required"&&(<span className='text-danger'>email is required</span>)}
                         <i className="fa-solid fa-mobile left-icon"></i>
                        </div>
                        <div className="form-group my-3">
                       <input className='form-control px-4' type="password" placeholder='Password' 
                       {...register("password",{required:true,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,}$/})}/>
                           {errors.password&&errors.password.type==="required"&&(<span className='text-danger'>Password Is required</span>)}
                           <i className="fa-solid fa-lock left-icon"></i>
                        </div>
                        <div className="form-group  my-3 position-relative d-flex justify-content-between">
                            <Link to ="/Register" className='text-black text-decoration-none'> RegisterNow? </Link>
                            <Link to ="/RequestResetPassword" className='text-success text-decoration-none '> Forget Password? </Link>
                            
                        </div>
                      <button className='bg-success form-control text-white logBtn' disabled={isLoading}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
//eng.fatma.fateh@gmail.com
//FatmaHossam5$
///^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
///^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,


   // "predeploy":" npm run deploy",
    // "deploy":"gh-pages -d deploy",
      // "homepage": "https://FatmaHossam5.github.io/Food-App",
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,}$/