import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'

export default function Masterlayout({userData}){
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className='master-layout'>
  
      
      <div className='layout-container'>
        {/* Sidebar */}
        <aside className='sidebar-container'>
          <SideBar 
            isMobileOpen={isMobileSidebarOpen}
            onMobileClose={handleCloseSidebar}
          />
        </aside>
        
        {/* Main Content Area */}
        <main className='main-content'>
          {/* Navbar */}
          <header className='navbar-container'>
            <Navbar 
              userData={userData} 
              onToggleSidebar={handleToggleSidebar}
            />
          </header>
          
          {/* Page Content */}
          <section className='page-content'>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  )
}
