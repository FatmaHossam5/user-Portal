import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';
import logo from "../../../assets/imgs/4 3.png";


export default function Register() {
   const{register,handleSubmit,formState:{errors}}= useForm();
   const{baseUrl}=useContext(AuthContext);
  const{getToastValue}= useContext(ToastContext);
const navigate =  useNavigate()

   const Register =(data)=>{
    axios.post(`${baseUrl}/Users/Register`,data)
    .then((response)=>{
        getToastValue('success',response?.data?.message)
        navigate('/Login')

    })
    .catch((error)=>{
      console.log(error);
       
        getToastValue('error',error?.response?.data?.message)
    })

   }
  return (
    <>
     <div className="Register-overlay">
       
            
      <div className="row  bg-overlay vh-100">
          <div className="col-md-10 m-auto">
              <div className="bg-white p-2" >
                  <div className="img text-center ">
                      <img src={logo}className='w-50' alt="logo" />
                  </div>
                
                  <form className='w-75 m-auto'onSubmit={handleSubmit(Register)} >
            
                  <h3>Register</h3>
                  <p className='text-color'>welcome Back!Please enter your details</p>
                      <div className="form-group my-3  d-flex justify-content-between ">
                        <div className=' col-md-5 '>
                        <i className="fa-solid fa-mobile left-icon  "></i>
                      <input className='form-control  ' type="text" placeholder='UserName'
                      {...register("userName",{required:true})}/>
                     
                      {errors.userName&&errors.userName.type==='required'&&(<span className='text-danger d-block'>userName is Required</span>)}

                     
                        </div>
                        <div className=' col-md-5 me-5'>
                        <i className="fa-regular fa-envelope right-icon "></i>
                     
                     <input className='form-control ' type="text" placeholder='Enter your E-mail'
                     {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                     />
                      {errors.email&&errors.email.type==='required'&&(<span className='text-danger d-block'>email is Required</span>)}
              
                            
                        </div>
                    
                  
                      </div>
                      <div className="form-group my-3 d-flex justify-content-between">
                        <div className="col-md-5">
                        <i className="fa-solid fa-globe    left-icon "></i>
                     <input className='form-control me-5 ' type="text" placeholder='Country'
                     {...register("country",{required:true})}
                      />
                      {errors.country&&errors.country.type==='required'&&(<span className='text-danger d-block'>country is Required</span>)}



                        </div>
                        <div className="col-md-5 me-5">
                        <i className="fa-solid fa-phone right-icon"></i>
                         <input className='form-control ' type="number" placeholder='PhoneNumber' 
                         {...register("phoneNumber",{required:true})}
                         />
                      {errors.phoneNumber&&errors.phoneNumber.type==='required'&&(<span className='text-danger d-block'>phoneNumber is Required</span>)}

                        </div>
                    
                    
                      </div>
                      <div className="form-group my-3 d-flex justify-content-between">
                        <div className="col-md-5">
                        <i className="fa-solid fa-lock  left-icon "></i>
                     <input className='form-control me-5 ' type="password" placeholder='Password' 
                     {...register("password",{required:true})}
                     />
                      {errors.password&&errors.password.type==='required'&&(<span className='text-danger d-block'>password is Required</span>)}
                     
                     <i className="fa-regular fa-eye eye-pass "></i>

                        </div>
                  <div className="col-md-5 me-5">
                  <i className="fa-solid fa-lock  right-icon"></i>
                     
                         <input className='form-control ' type="password" placeholder='confirm-password'
                         {...register("confirmPassword",{required:true})}
                         
                         />
                     <i className="fa-regular fa-eye eye-confirm  "></i>
                     {errors.confirmPassword&&errors.confirmPassword.type==='required'&&(<span className='text-danger d-block'>confirmPassword is Required</span>)}


                  </div>
                   

                      </div>
                      <div className='text-end my-3'>
                        <Link to ='/Login'className='text-decoration-none g-log '>Login Now?</Link>
                      </div>
                      <div className='text-center my-3 '>
                      <button className='bg-success w-50 rounded-2  py-2  text-white Reg-Btn' >Register</button>

                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
    
    
    
    </>
  )
}
