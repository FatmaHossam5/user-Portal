import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import logo from "../../../assets/imgs/4 3.png";

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const handleRegister = (data) => {
    setIsLoading(true);
    axios.post(`${baseUrl}/Users/Register`, data)
      .then((response) => {
        getToastValue('success', response?.data?.message);
        navigate('/Login');
      })
      .catch((error) => {
        console.log(error);
        getToastValue('error', error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="AuthContainer">
      <div className="row bg-overlay  g-0">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 m-auto">
          <div className="bg-white register-card shadow-lg">
            {/* Logo Section */}
            <div className="text-center mb-4">
              <img src={logo} className='login-logo' alt="Company Logo" />
            </div>
          
            {/* Form Section */}
            <form className='login-form' onSubmit={handleSubmit(handleRegister)}>
              <div className="text-center mb-4">
                <h2 className="login-title mb-2">Create Account</h2>
                <p className='login-subtitle'>Join us today! Please fill in your details</p>
              </div>

              {/* Row 1: Username and Email */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="form-group">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <div className="input-wrapper">
                      <input 
                        id="userName"
                        className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                        type="text" 
                        placeholder='Enter your username'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 20px 15px 45px' }}
                        {...register("userName", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                          }
                        })}
                      />
                      <i className="fa-solid fa-user input-icon"></i>
                    </div>
                    {errors.userName && (
                      <div className="invalid-feedback d-block">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="input-wrapper">
                      <input 
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        type="email" 
                        placeholder='Enter your email address'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 20px 15px 45px' }}
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
                </div>
              </div>

              {/* Row 2: Country and Phone Number */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Country</label>
                    <div className="input-wrapper">
                      <input 
                        id="country"
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        type="text" 
                        placeholder='Enter your country'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 20px 15px 45px' }}
                        {...register("country", {
                          required: "Country is required"
                        })}
                      />
                      <i className="fa-solid fa-globe input-icon"></i>
                    </div>
                    {errors.country && (
                      <div className="invalid-feedback d-block">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <div className="input-wrapper">
                      <input 
                        id="phoneNumber"
                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        type="tel" 
                        placeholder='Enter your phone number'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 20px 15px 45px' }}
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[+]?[\d\s\-\(\)]{10,}$/,
                            message: "Please enter a valid phone number"
                          }
                        })}
                      />
                      <i className="fa-solid fa-phone input-icon"></i>
                    </div>
                    {errors.phoneNumber && (
                      <div className="invalid-feedback d-block">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3: Password and Confirm Password */}
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-wrapper">
                      <input 
                        id="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 50px 15px 45px' }}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: "Password must contain uppercase, lowercase, and number"
                          }
                        })}
                      />
                      <i className="fa-solid fa-lock input-icon"></i>
                      <button
                        type="button"
                        className="btn btn-link p-0 position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ border: 'none', background: 'none', color: '#6c757d' }}
                      >
                        <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-wrapper">
                      <input 
                        id="confirmPassword"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirm your password'
                        style={{ height: '60px', fontSize: '16px', padding: '15px 50px 15px 45px' }}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: value => value === password || "Passwords do not match"
                        })}
                      />
                      <i className="fa-solid fa-lock input-icon"></i>
                      <button
                        type="button"
                        className="btn btn-link p-0 position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ border: 'none', background: 'none', color: '#6c757d' }}
                      >
                        <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Links Section */}
              <div className="text-center mb-4">
                <Link to='/Login' className='login-link'>
                  Already have an account? <span className="text-success fw-semibold">Sign in</span>
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className={`btn btn-success w-100 login-btn ${isLoading ? 'loading' : ''}`}
                style={{ height: '60px', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
