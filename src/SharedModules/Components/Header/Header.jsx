import React from 'react'
import bg from '../../../assets/imgs/bg.png'
export default function Header({title,paragraph}) {
  return (
    <>
   
    <div className='header-content text-white '> 
    <div className="container-fluid">
      <div className="row px-4 py-2 g-0 align-items-center">
        <div className="col-sm-10">
        <h3 className='ps-3'>{title}</h3>
        <p className='ps-3'>{paragraph}</p>
        </div>
        <div className="col-md-2">
        <img  className='img-fluid' src={bg} alt="background" />
      </div>
      </div>

    </div>
    
   
     
   
   
    </div>
    
   
    </>
  )
}
