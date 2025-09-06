import React, { useContext, useState } from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';

export default function ({handleClose}) {
 const{register,handleSubmit,formState:{errors}} =useForm();
const {requestHeaders,baseUrl}=useContext(AuthContext)
 const {getToastValue}=useContext(ToastContext)
  const navigate=useNavigate()
 const onSubmit= (data)=>{
  
  axios.put(`${baseUrl}/Users/ChangePassword`,data,{headers:requestHeaders}
  ).then((response)=>{
    getToastValue('success',"Changed Successfully")
 navigate('/Login')
    handleClose()
  }).catch((error)=>{
    getToastValue("error",error?.response?.data?.message);
  
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
                            <h2 className="login-title mb-2">Change Password</h2>
                            <p className='login-subtitle'>Enter your current and new password details</p>
                        </div>

                        {/* Old Password Field */}
                        <div className="form-group mb-4">
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
                        <div className="form-group mb-4">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="newPassword"
                                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Enter your new password'
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
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
                        </div>

                        {/* Confirm New Password Field */}
                        <div className="form-group mb-4">
                            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                            <div className="input-wrapper">
                                <input 
                                    id="confirmNewPassword"
                                    className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : ''}`}
                                    type="password" 
                                    placeholder='Confirm your new password'
                                    {...register("confirmNewPassword", {
                                        required: "Please confirm your new password"
                                    })}
                                />
                                <i className="fa-solid fa-lock input-icon"></i>
                            </div>
                            {errors.confirmNewPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.confirmNewPassword.message}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="btn btn-success w-100 login-btn"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
