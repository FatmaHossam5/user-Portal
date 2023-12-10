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
    <div  >
            <div className="container-fluid ">
            <div className="row    ">
       
         
       <div className="img text-center ">
           <img src={logo} className='w-50' alt="logo" />
       </div>
     
       <form className='w-75 m-auto'onSubmit={handleSubmit(onSubmit)} >
 
       <h3>Change Your Password</h3>
       <p className='text-color'>Enter your details below</p>
           <div className="form-group my-3">
           <input className='form-control email  px-4 ' type="password" placeholder='old Password'
          {...register("oldPassword",{required:true})}
            />
            {errors.oldPassword&&errors.oldPassword.type==='required'&&(<span className='text-danger'>old password is required</span>)}
            <i className="fa-solid fa-mobile  left-icon"></i>
            <i className="fa-regular fa-eye eye-pass eye-3 "></i>

           </div>
           
           <div className="form-group my-3">
           <input className='form-control  px-4' type="password" placeholder='New Password'
           {...register("newPassword",{required:true})}
           />
            {errors.newPassword&&errors.newPassword.type==='required'&&(<span className='text-danger'>newPassword is required</span>)}
              <i className="fa-solid fa-lock  left-icon"></i>
            <i className="fa-regular fa-eye eye-pass eye-3 "></i>
        


           </div>
        
           <div className="form-group my-3">
           <input className='form-control  px-4' type="password" placeholder=' Confirm New Password'
           {...register("confirmNewPassword",{required:true})}
           />
            {errors.confirmNewPassword&&errors.confirmNewPassword.type==='required'&&(<span className='text-danger'>confirmNewPassword is required</span>)}

              <i className="fa-solid fa-lock  left-icon"></i>
            <i className="fa-regular fa-eye eye-pass eye-3 "></i>

           </div>
         <button className='bg-success form-control text-white logBtn mt-5'>Change Password</button>
       </form>
   </div>

            </div>
   
      
   
</div>
  )
}
