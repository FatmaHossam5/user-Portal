import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import logo from "../../../assets/imgs/4 3.png";

export default function EmailVerification() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Get email from location state or use empty string
  const emailFromState = location.state?.email || '';
  
  // Debug logging
  console.log('EmailVerification - Location state:', location.state);
  console.log('EmailVerification - Email from state:', emailFromState);

  const handleVerification = (data) => {
    setIsLoading(true);
    axios.put(`${baseUrl}/Users/verify`, data)
      .then((response) => {
        getToastValue('success', response?.data?.message || 'Email verified successfully!');
        navigate('/Login');
      })
      .catch((error) => {
        console.log(error);
        getToastValue('error', error?.response?.data?.message || 'Verification failed. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResendCode = () => {
    if (!emailFromState) {
      getToastValue('error', 'Email address is required to resend verification code');
      return;
    }

    setIsResending(true);
    axios.post(`${baseUrl}/Users/verify`, { email: emailFromState })
      .then((response) => {
        getToastValue('success', response?.data?.message || 'Verification code sent successfully!');
      })
      .catch((error) => {
        console.log(error);
        getToastValue('error', error?.response?.data?.message || 'Failed to resend verification code');
      })
      .finally(() => {
        setIsResending(false);
      });
  };

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
            <form className='login-form' onSubmit={handleSubmit(handleVerification)}>
              <div className="text-center mb-4">
                <h2 className="login-title mb-2">Verify Your Email</h2>
                <p className='login-subtitle'>
                  We've sent a verification code to your email address. Please enter the code below to verify your account.
                </p>
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
                    defaultValue={emailFromState}
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

              {/* Verification Code Field */}
              <div className="form-group mb-4">
                <label htmlFor="code" className="form-label">Verification Code</label>
                <div className="input-wrapper">
                  <input 
                    id="code"
                    className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                    type="text" 
                    placeholder='Enter verification code'
                    {...register("code", {
                      required: "Verification code is required",
                      minLength: {
                        value: 4,
                        message: "Verification code must be at least 4 characters"
                      }
                    })}
                  />
                  <i className="fa-solid fa-key input-icon"></i>
                </div>
                {errors.code && (
                  <div className="invalid-feedback d-block">
                    {errors.code.message}
                  </div>
                )}
              </div>

              {/* Resend Code Section */}
              <div className="text-center mb-4">
                <p className="text-muted mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  className="btn btn-link p-0 text-success"
                  onClick={handleResendCode}
                  disabled={isResending || !emailFromState}
                  style={{ textDecoration: 'none' }}
                >
                  {isResending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Resending...
                    </>
                  ) : (
                    'Resend Verification Code'
                  )}
                </button>
              </div>

              {/* Links Section */}
              <div className="text-center mb-4">
                <Link to="/Login" className='login-link'>
                  Back to <span className="text-success fw-semibold">Sign In</span>
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
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
