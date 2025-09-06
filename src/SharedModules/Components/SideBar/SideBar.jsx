import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../assets/imgs/3.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ForgetPassword from '../../../AuthModule/Components/ForgetPassword/ForgetPassword';

export default function SideBar({isMobileOpen, onMobileClose}) {
  let navigate = useNavigate()
  let [isCollapsed, setIsCollapsed] = useState(false)
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }
  
  let logOut = () => {
    localStorage.removeItem("userToken")
    navigate('/login')
  }

  const handleMobileClose = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  }

  return (
    <>
  

      
      <div className={`sideBar-Container ${isMobileOpen ? 'mobile-open' : ''}`}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ForgetPassword handleClose={handleClose}/>
          </Modal.Body>
        </Modal>

        {/* Mobile Sidebar - Custom Implementation */}
        {isMobileOpen && (
          <div className="mobile-sidebar-custom" style={{display: 'block', position: 'fixed', top: 0, left: 0, width: '280px', height: '100vh', background: '#1f263e', zIndex: 9999}}>
            <div className="mobile-close-btn" onClick={handleMobileClose}>
              <i className="fa-solid fa-times"></i>
            </div>
            
            <div className="mobile-sidebar-content">
              {/* Logo Section */}
              <div className="mobile-logo-section">
                <div className="logo-container">
                  <img src={logo} alt='logo' className="sidebar-logo" />
                  <span className="logo-text">Food Portal</span>
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="mobile-menu-section">
                <Link to='/dashboard' className="mobile-menu-item" onClick={handleMobileClose}>
                  <i className="fa-solid fa-house menu-icon"></i>
                  Home
                </Link>
                
                <Link to='/dashboard/recipes' className="mobile-menu-item" onClick={handleMobileClose}>
                  <i className="fa-solid fa-utensils menu-icon"></i>
                  Recipes
                </Link>
                
                <Link to='/dashboard/favorites' className="mobile-menu-item" onClick={handleMobileClose}>
                  <i className="fa-regular fa-heart menu-icon"></i>
                  Favorites
                </Link>
              </div>

              {/* User Actions Section */}
              <div className="mobile-user-actions-section">
                <button className="mobile-menu-item action-item" onClick={() => { handleShow(); handleMobileClose(); }}>
                  <i className="fa-solid fa-lock menu-icon"></i>
                  Change Password
                </button>
                
                <button className="mobile-menu-item action-item logout-item" onClick={() => { logOut(); handleMobileClose(); }}>
                  <i className="fa-solid fa-right-from-bracket menu-icon"></i>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <Sidebar 
          collapsed={isCollapsed}
          className="enhanced-sidebar d-none d-lg-block"
          width="280px"
          collapsedWidth="80px"
          transitionDuration={300}
        >
          <Menu className="enhanced-menu">
            {/* Mobile Close Button */}
            <div className="mobile-close-btn d-lg-none" onClick={handleMobileClose}>
              <i className="fa-solid fa-times"></i>
            </div>

            {/* Logo Section */}
            <MenuItem 
              className='logo-section' 
              onClick={handleToggle}
              icon={
                <div className="logo-container">
                  <img src={logo} alt='logo' className="sidebar-logo" />
                  {!isCollapsed && <span className="logo-text">Food Portal</span>}
                </div>
              }
            />
          
          {/* Navigation Items */}
          <div className="menu-section">
            <MenuItem 
              icon={<i className="fa-solid fa-house menu-icon"></i>} 
              component={<Link to='/dashboard' />}
              className="menu-item"
            > 
              Home 
            </MenuItem>
            
            <MenuItem 
              icon={<i className="fa-solid fa-utensils menu-icon"></i>} 
              component={<Link to='/dashboard/recipes' />}
              className="menu-item"
            > 
              Recipes 
            </MenuItem>
            
            <MenuItem 
              icon={<i className="fa-regular fa-heart menu-icon"></i>} 
              component={<Link to='/dashboard/favorites' />}
              className="menu-item"
            > 
              Favorites 
            </MenuItem>
          </div>

          {/* User Actions Section */}
          <div className="user-actions-section">
            <MenuItem 
              onClick={handleShow} 
              icon={<i className="fa-solid fa-lock menu-icon"></i>}
              className="menu-item action-item"
            > 
              Change Password 
            </MenuItem>
            
            <MenuItem 
              icon={<i className="fa-solid fa-right-from-bracket menu-icon"></i>} 
              onClick={logOut}
              className="menu-item action-item logout-item"
            > 
              Log Out 
            </MenuItem>
          </div>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}
