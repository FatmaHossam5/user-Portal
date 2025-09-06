import React from 'react'
import bg from '../../../assets/imgs/bg.png'

export default function Header({ title, paragraph }) {
  return (
    <header className='header-content text-white' role="banner">
      <div className="container-fluid">
        <div className="row g-0 align-items-center">
          {/* Main Content Section */}
          <div className="col-lg-10 col-md-9 col-sm-8">
            <div className="header-text-content">
              <h1 className="header-title">{title}</h1>
              <p className="header-description">{paragraph}</p>
            </div>
          </div>
          
          {/* Visual Element Section */}
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="header-visual-wrapper">
              <img 
                className='header-image' 
                src={bg} 
                alt="Decorative illustration representing the application theme" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
