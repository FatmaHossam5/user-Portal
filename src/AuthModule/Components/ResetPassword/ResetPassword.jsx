import React, { useContext } from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { get, useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'

export default function ResetPassword() {
     const {register,handleSubmit,formState:{errors}}=useForm();
     const {baseUrl}=useContext(AuthContext)
    const {getToastValue}=useContext(ToastContext)
 
       const navigate=useNavigate()
   
     const onSubmit =(data)=>{
       axios.post(`${baseUrl}/Users/Reset`,data).then((response)=>{
        getToastValue('success','Done')
        navigate('/login')
        
       }).catch((error)=>{
       getToastValue('error',error.response.data.message);
       })
     }
  return (
    <div className="AuthContainer">
        <div className="row bg-overlay vh-100 g-0">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 m-auto">
                <div className="bg-white login-card shadow-lg">
                    {/* Logo Section */}
                    <div className="text-center mb-4">
                        <img src={logo} className='login-logo' alt="Company Logo" />
                    </div>
                  
                    {/* Form Section */}
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-4">
                            <h2 className="login-title mb-2">Reset Password</h2>
                            <p className='login-subtitle'>Please enter your OTP and new password</p>
                        </div>

                        {/* Email Field */}
                        <div className="form-group mb-4">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <input 
                                    id="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    type="email" 
                                    placeholder='Enter your email address'
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                                <i className="fa-solid fa-envelope input-icon"></i>
                            </div>
                            {errors.email && (
                                <div className="invalid-feedback d-block">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        {/* OTP Field */}
                        <div className="form-group mb-4">
                            <label htmlFor="seed" className="form-label">OTP Code</label>
                            <div className="input-wrapper">
                                <input 
                                    id="seed"
                                    className={`form-control ${errors.seed ? 'is-invalid' : ''}`}
                                    type="text" 
                                    placeholder='Enter OTP code'
                                    {...register("seed", {
                                        required: "OTP is required"
                                    })}
                                />
                                <i className="fa-solid fa-key input-icon"></i>
                            </div>
                            {errors.seed && (
                                <div className="invalid-feedback d-block">
                                    {errors.seed.message}
                                </div>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Enter new password'
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.password && (
                                <div className="invalid-feedback d-block">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="confirmPassword"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Confirm new password'
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password"
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.confirmPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="btn btn-success w-100 login-btn"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

  )
}
