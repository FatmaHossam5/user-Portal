
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { AuthContext } from '../../../Context/AuthContext'
import axios from 'axios'
import avatar from '../../../assets/imgs/avatar.png'
import { ToastContext } from '../../../Context/ToastContext'
import DataNo from '../../../assets/imgs/DataNo.svg'
import { Modal } from 'react-bootstrap'


export default function FavoriteLists() {
  const [favList,setFavList] =useState([])
  const [itemId,setItemId]=useState(0)
  const[pagesArray,setPagesArray]=useState([])
  const {baseUrl,requestHeaders}=useContext(AuthContext)
  const {getToastValue}=useContext(ToastContext)
  const[modalState,setModalState]=useState("close")

  const handleClose = () => setModalState("close");

const getAllFavorites =(pageNo)=>{
  axios.get(`${baseUrl}/userRecipe`,{headers:requestHeaders
  ,params:{pageNumber:pageNo}
}).then((response)=>{
    setFavList(response?.data?.data)
    setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))

  }).catch((error)=>{
  getToastValue('error',error.response.data.message)
  })
}


const showDeleteModal  =(id)=>{
  setModalState("view-modal")
  setItemId(id)
  
  
    }
 const deleteFav =()=>{
  
 axios.delete(`${baseUrl}/userRecipe/${itemId}`,{headers:requestHeaders}).then((response)=>{
  console.log(response);
handleClose()
getToastValue('success','Deleted Successfully')
  getAllFavorites()
  
 }).catch((error)=>{
  getToastValue('error',error?.response?.data?.message)

 })
 }
  useEffect(()=>{getAllFavorites(1)},[])
  return (
    <div>
      
    
      <Header title={"Favorites Items"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
     
      <Modal show={modalState==='view-modal'} onHide={handleClose}>
       
       <Modal.Body>
       
       <div className="delete-container">
          <div className="icons text-end">
        <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
          </div>
          <div className="text-center">
            <div className="text-center">
            <img className=' '  src={DataNo} alt="msg-NoData" />
            </div>
            <h5 className='py-3'> Delete This Favorite Item ? </h5>
          <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
          </div>
         

         
          <div className="delete-btn text-end">
            <button onClick={deleteFav} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
          </div>
        </div>
   
       </Modal.Body>
      
     </Modal>
     
      <div className="col-md-10 m-auto ">
      <div className="row ">
{favList.map(fav=> <div className='col-md-4  m-auto mt-5 rounded-5'>


  <div className='text-center  rounded-4 w-75 m-auto box' >
  <div className="position-relative">
      {fav?.recipe?.imagePath?(<img className='img-fluid rounded-3' src={`https://upskilling-egypt.com/`+fav?.recipe?.imagePath} />):(<img className='img-fluid'src={avatar}/>)}
<div className=" text-end position-absolute top-0 end-0 me-2">
<i onClick={()=>showDeleteModal(fav?.recipe?.id)}  className ="fa-solid fa-heart text-success"></i>
</div>
      </div>
      <div className="text-start ps-3">
        {fav?.recipe?.name}
      </div>
      <div className="text-start ps-3">
        {fav?.recipe?.tag?.name}
      </div>

   
  </div>
</div>)}


</div>
      </div>
      <nav aria-label="...">
  <ul className="pagination pagination-xs mt-5 me-5 w-50 m-auto d-flex justify-content-end">
   {pagesArray.map((pageNo)=>    <li  className="page-item  "><a onClick={()=>getAllFavorites(pageNo)} className="page-link">{pageNo}</a></li>
)}
    
    
    
    
    
  
  </ul>
  
</nav>

    </div>
  )
}
