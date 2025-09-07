import React, { useContext, useState } from 'react'
import logo from "../../../assets/imgs/4 3.png"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'

export default function Login({ saveUserData }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { baseUrl, requestHeaders } = useContext(AuthContext)
    const { getToastValue } = useContext(ToastContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (data) => {
        setIsLoading(true)
        axios.post(`${baseUrl}/Users/Login`, data)
            .then((response) => {
                localStorage.setItem("userToken", response?.data?.token)
                saveUserData()
                navigate('/dashboard')
            }).catch((error) => {

                setIsLoading(false)



                getToastValue("error", error?.response?.data?.message || "Login failed. Please try again.");

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
                        <form className='login-form' onSubmit={handleSubmit(handleLogin)}>
                            <div className="text-center mb-4">
                                <h2 className="login-title mb-2">Welcome Back</h2>
                                <p className='login-subtitle'>Please sign in to your account</p>
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

                            {/* Password Field */}
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <input
                                        id="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        type="password"
                                        placeholder='Enter your password'
                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,}$/,
                                                message: "Password must contain at least 6 characters with uppercase, lowercase, number and special character"
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

                            {/* Links Section */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link to="/Register" className='login-link'>
                                    Don't have an account? <span className="text-success fw-semibold">Sign up</span>
                                </Link>
                                <Link to="/RequestResetPassword" className='login-link text-success'>
                                    Forgot Password?
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
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
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