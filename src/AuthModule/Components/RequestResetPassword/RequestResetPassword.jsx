import React, { useContext, useState } from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'

export default function RequestResetPassword() {
    const navigate = useNavigate()
    const { baseUrl, requestHeaders } = useContext(AuthContext)
    const { getToastValue } = useContext(ToastContext)
    const [isLoading, setIsLoading] = useState(false)
   
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const onSubmit = (data) => {
        setIsLoading(true)
        
        // Prepare headers for the request
        const headers = {
            ...requestHeaders,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        axios.post(`${baseUrl}/Users/Reset/Request`, data, {
            headers: headers
        })
            .then((response) => {
              console.log(response);
              
                getToastValue('success', 'Password reset link sent! Please check your email.')
                navigate('/ResetPassword')
            })
            .catch((error) => {
                console.log('Reset password error:', error)
                
                // Handle different types of errors
                if (error.code === 'ERR_NETWORK') {
                    getToastValue('error', 'Network error. Please check your internet connection.')
                } else if (error.response?.status === 405) {
                    getToastValue('error', 'This endpoint is not available. Please contact support.')
                } else if (error.response?.status === 404) {
                    getToastValue('error', 'Email not found. Please check your email address.')
                } else {
                    getToastValue('error', error.response?.data?.message || 'Failed to send reset email. Please try again.')
                }
            })
            .finally(() => {
                setIsLoading(false)
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
                                <p className='login-subtitle'>Enter your email address and we'll send you a link to reset your password</p>
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

                            {/* Links Section */}
                            <div className="text-center mb-4">
                                <Link to="/Login" className='login-link'>
                                    Remember your password? <span className="text-success fw-semibold">Sign in</span>
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className={`btn btn-success w-100 login-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Sending Reset Link...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
