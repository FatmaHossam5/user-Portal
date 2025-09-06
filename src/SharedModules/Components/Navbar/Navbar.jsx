import React, { useState, useEffect, useRef } from 'react'
import avatar from '../../../assets/imgs/avatar.png'

export default function Navbar({userData, onToggleSidebar}) {
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchValue);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSidebarToggle = () => {
   
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light enhanced-navbar">
        <div className="container-fluid">
          {/* Mobile Sidebar Toggle Button */}
          <button 
            className="mobile-sidebar-toggle d-lg-none" 
            type="button" 
            onClick={handleSidebarToggle}
            aria-label="Toggle sidebar"
            title="Open menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-content w-100 d-flex justify-content-between align-items-center">
              
              {/* Search Section */}
              <div className="search-section">
                <form onSubmit={handleSearchSubmit} className="search-form">
                  <div className="search-input-wrapper">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input 
                      type="text" 
                      className="form-control search-input" 
                      placeholder="Search recipes, ingredients..." 
                      value={searchValue}
                      onChange={handleSearchChange}
                      aria-label="Search recipes and ingredients"
                      title="Search for recipes and ingredients"
                    />
                    {searchValue && (
                      <button 
                        type="button" 
                        className="clear-search-btn"
                        onClick={() => setSearchValue('')}
                        aria-label="Clear search"
                        title="Clear search"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* User Profile Section */}
              <div className="user-profile-section">
                <div className="user-profile-wrapper">
                  {/* Notifications */}
                  <button 
                    className="notification-btn" 
                    aria-label={`${3} notifications`}
                    title="View notifications"
                  >
                    <i className="fa-solid fa-bell"></i>
                    <span className="notification-badge" aria-hidden="true">3</span>
                  </button>

                  {/* User Profile */}
                  <div className="user-profile-dropdown" ref={dropdownRef}>
                    <button 
                      className="user-profile-btn"
                      onClick={toggleUserMenu}
                      aria-expanded={showUserMenu}
                      aria-label={`User menu for ${userData?.userName || 'User'}`}
                      aria-haspopup="true"
                      title="User menu"
                    >
                      <img 
                        src={avatar} 
                        alt={`${userData?.userName || 'User'} avatar`}
                        className="user-avatar" 
                      />
                      <span className="user-name d-none d-md-inline">{userData?.userName || 'User'}</span>
                      <span className="user-name-mobile d-md-none">{userData?.userName?.charAt(0) || 'U'}</span>
                      <i className={`fa-solid fa-chevron-down chevron ${showUserMenu ? 'rotated' : ''}`}></i>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                      <div className="user-dropdown-menu" role="menu">
                        <div className="dropdown-header">
                          <img src={avatar} alt={`${userData?.userName || 'User'} avatar`} className="dropdown-avatar" />
                          <div className="user-info">
                            <div className="user-name">{userData?.userName || 'User'}</div>
                            <div className="user-email">{userData?.email || 'user@example.com'}</div>
                          </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item" role="menuitem">
                          <i className="fa-solid fa-user"></i>
                          <span>Profile</span>
                        </a>
                        <a href="#" className="dropdown-item" role="menuitem">
                          <i className="fa-solid fa-cog"></i>
                          <span>Settings</span>
                        </a>
                        <a href="#" className="dropdown-item" role="menuitem">
                          <i className="fa-solid fa-lock"></i>
                          <span>Change Password</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item logout-item" role="menuitem">
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <span>Log Out</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
