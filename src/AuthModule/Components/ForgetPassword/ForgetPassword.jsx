import React, { useContext, useState } from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';

export default function ForgetPassword ({handleClose}) {
 const{register,handleSubmit,formState:{errors},watch}=useForm();
const {requestHeaders,baseUrl}=useContext(AuthContext)
 const {getToastValue}=useContext(ToastContext)
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  // Watch password fields for validation
  const newPassword = watch("newPassword")
  const confirmPassword = watch("confirmNewPassword")
  
 const onSubmit= (data)=>{
  setIsLoading(true)
  axios.put(`${baseUrl}/Users/ChangePassword`,data,{headers:requestHeaders}
  ).then((response)=>{
    getToastValue('success',"Password changed successfully!")
    navigate('/Login')
    handleClose()
  }).catch((error)=>{
    getToastValue("error",error?.response?.data?.message || "Failed to change password. Please try again.");
  }).finally(() => {
    setIsLoading(false)
  })
 }
  return (
    <div className="forget-password-modal">
        {/* Modern Modal Backdrop */}
        <div className="modal-backdrop-blur"></div>
        
        {/* Modal Content */}
        <div className="modal-content-container">
            <div className="modern-modal-card">
                {/* Close Button */}
                <button 
                    type="button" 
                    className="modal-close-btn"
                    onClick={handleClose}
                    aria-label="Close modal"
                    title="Close"
                >
                    <i className="fa-solid fa-times"></i>
                </button>
                {/* Header Section with Modern Styling */}
                <div className="modal-header-section">
                    <div className="text-center mb-4">
                        <div className="modal-logo-container">
                            <img src={logo} className='modal-logo' alt="Company Logo" />
                        </div>
                    </div>
                  
                    {/* Form Section */}
                    <form className='modern-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-4">
                            <div className="password-change-icon mb-3">
                                <div className="icon-container">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                            </div>
                            <h2 className="modal-title mb-2">Change Password</h2>
                            <p className='modal-subtitle mb-0'>Enter your current password and choose a new secure password</p>
                        </div>

                        {/* Old Password Field */}
                        <div className="form-group mb-3">
                            <label htmlFor="oldPassword" className="form-label">Current Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="oldPassword"
                                    className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Enter your current password'
                                    {...register("oldPassword", {
                                        required: "Current password is required"
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.oldPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.oldPassword.message}
                                </div>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div className="form-group mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                New Password
                                <span className="text-muted ms-1">(min. 8 characters)</span>
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    id="newPassword"
                                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Enter your new password'
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                        }
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.newPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.newPassword.message}
                                </div>
                            )}
                            {/* Password Strength Indicator */}
                            {newPassword && (
                                <div className="password-strength mt-2">
                                    <div className="strength-bar">
                                        <div 
                                            className={`strength-fill ${newPassword.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword) ? 'strong' : newPassword.length >= 6 ? 'medium' : 'weak'}`}
                                        ></div>
                                    </div>
                                    <small className={`strength-text ${newPassword.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword) ? 'text-success' : newPassword.length >= 6 ? 'text-warning' : 'text-danger'}`}>
                                        {newPassword.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword) ? 'Strong password' : newPassword.length >= 6 ? 'Medium strength' : 'Weak password'}
                                    </small>
                                </div>
                            )}
                        </div>

                        {/* Confirm New Password Field */}
                        <div className="form-group mb-3">
                            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="confirmNewPassword"
                                    className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : confirmPassword && newPassword === confirmPassword ? 'is-valid' : ''}`}
                                    type="password" 
                                    placeholder='Confirm your new password'
                                    {...register("confirmNewPassword", {
                                        required: "Please confirm your new password",
                                        validate: value => value === newPassword || "Passwords do not match"
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.confirmNewPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.confirmNewPassword.message}
                                </div>
                            )}
                            {confirmPassword && newPassword === confirmPassword && !errors.confirmNewPassword && (
                                <div className="valid-feedback d-block">
                                    <i className="fa-solid fa-check-circle me-1"></i>
                                    Passwords match
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="btn modern-submit-btn w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Changing Password...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-key me-2"></i>
                                    Change Password
                                </>
                            )}
                        </button>
                        
                        {/* Additional Help Text */}
                        <div className="text-center mt-3">
                            <div className="security-badge">
                                <i className="fa-solid fa-shield-halved me-2"></i>
                                <span>Your password is encrypted and secure</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
