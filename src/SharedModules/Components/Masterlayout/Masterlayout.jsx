import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'

export default function Masterlayout({userData}){
  return <>
<div className='d-flex'>
  <div className='Side'>
  <SideBar/>
  </div>
  <div className='container-fluid'> 
  <Navbar userData={userData} />
              
              <Outlet />
  </div>
</div>
 
      
      
      
            
           
             
  </>
}
