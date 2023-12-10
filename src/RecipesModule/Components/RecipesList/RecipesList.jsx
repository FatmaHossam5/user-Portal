import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'
import Header from '../../../SharedModules/Components/Header/Header'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import DataNo from '../../../assets/imgs/DataNo.svg'
import avatar from '../../../assets/imgs/avatar.png'



export default function RecipesList() {
  const[recipeList,setRecipeList]=useState([])
  const[modalState,setModalState]=useState("close")
  const[tag,setTag]=useState([])
  const[categoryList,setCategoryList]=useState([])
   const[itemId,setItemId]=useState(0)
  const[pagesArray,setPagesArray]=useState([])
   const[recipe,setRecipe]=useState()
   const[searchTagId,setSearchTagId]=useState()
   const[searchCatId,setSearchCatId]=useState()
  const[searchInput,setSearchInput]=useState("")
   const [recipeDetails,setRecipeDetails]=useState({})
const{requestHeaders,baseUrl}=useContext(AuthContext)
const {getToastValue }=useContext(ToastContext)


  const handleClose = () => setModalState("close");
 
   

 
 
  

   const showViewModal  =(id)=>{
    setModalState("view-modal")
    setItemId(id)
    getRecipeDetails(id)
    
      }
     

      const getRecipeDetails =(id)=>{
        axios.get(`${baseUrl}/Recipe/${id}`,{headers:{
          requestHeaders
    
          
        },
    
        }).then((response)=>{
          
          setRecipeDetails(response?.data);
        }).catch((error)=>{
          getToastValue('error',error.response.data.message)
          
        })
      }

      
  const getAllRecipes =(pageNo,name,tagId,categoryId)=>{
    axios.get(`${baseUrl}/Recipe/`,{headers:{
     requestHeaders

      
    },params:{
      pageSize:5,
      pageNumber:pageNo,
      name,
      tagId,
      categoryId,
    }

    }).then((response)=>{

    
      setRecipeList(response?.data?.data);
      setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
    }).catch((error)=>{
      getToastValue('error',error.response.data.message)
      
    })
  }
  const getCategoryId =()=>{
    axios.get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`,{headers:{
      requestHeaders

      
    },

    }).then((response)=>{
      

      setCategoryList(response?.data?.data);
    }).catch((error)=>{
      getToastValue('error',error.response.data.message)
      
    })
  }
  const getTagId=()=>{
    axios.get(`${baseUrl}/tag/`,{
      headers:{
      requestHeaders
      }
    }).then((response)=>{
      
      setTag(response?.data);
    }).catch((error)=>{
      getToastValue('error',error.response.data.message)

    }
    )
  }
 
const getNameValue =(name)=>{
 setSearchInput(name.target.value);
 getAllRecipes(1,name.target.value)
}

  const getTagValue = (select)=>{
    setSearchTagId(select.target.value)
    getAllRecipes(1,searchInput,select.target.value,searchCatId);
  }
  const getCategoryValue =(select)=>{
    setSearchCatId(select.target.value)
    getAllRecipes(1,searchInput,searchTagId,select.target.value)


  }

  const addToFavorite =()=>{
    axios.post (`${baseUrl}/userRecipe/`,{recipeId:itemId},{headers:requestHeaders}).then((response)=>{
      getToastValue('success','added Successfully')
      handleClose()
    

    }).catch((error)=>{
      getToastValue("error",error?.response?.data?.message)
    })
  }
  useEffect(()=>{
    getTagId();
    getCategoryId();

getAllRecipes(1);

  },[])
  return (
   
   <>
        <Header title={"Recipe Items"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
      
  
   
   
     <Modal show={modalState==='view-modal'} onHide={handleClose}>
       
       <Modal.Body>
       
        <div className="delete-container">
        
          <div className="icons text-end">
        <i onClick={()=>handleClose()} className="fa-regular fa-circle-xmark text-danger "></i>
          </div>
          <h4>Recipe Details</h4>
          <div className="imgs-container text-center ">
           
            {recipeDetails?.imagePath?(<img className='img-fluid' src={`https://upskilling-egypt.com/`+recipeDetails?.imagePath} /> ):(<img className='img-fluid' src={DataNo}/>)}
          <h4 className='mt-3'> Description: {recipeDetails?.description}</h4>
         
          <h4>Tag : {recipeDetails?.tag?.name}</h4>

            <div className="delete-btn text-end">
            <button onClick={addToFavorite} className='text-white btn btn-outline-success bg-success  border-success rounded-2 '>Add To Favorites </button>
          </div>
          </div>
        
        </div>
   
   
       </Modal.Body>
      
     </Modal>
     <div className="col-md-10 m-auto">
     <div className='row '>
            <h6 className='ps-4 mt-3'>
            Recipes Table Details
            </h6>
            <span className='ps-4 mb-4'>You can check all details</span>
          

      
      
        <div className="col-md-4 mb-3">
          <input onChange={getNameValue} className='form-control' placeholder='search by name'  type="text" />
        </div>
        <div className="col-md-4">
        <select onChange={getTagValue} className='form-select' >
          <option value="">select Tag</option>
                {tag ? tag.map((t) => <option value={t.id}>{t.name}</option>) : null}


              </select>
        </div>
        <div className="col-md-4">
        <select onChange={getCategoryValue} className='form-select' >
          <option value="">select Category</option>
                {categoryList ? categoryList.map((cat) => <option value={cat.id}>{cat.name}</option>) : null}


              </select>
        </div>
        {recipeList.length>0?  <div className=''>
      <table class="table  table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Tag</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>



    

    </tr>
  </thead>
  <tbody>
  {recipeList.map((recipe,index)=><>
  <tr >
    <th scope='row'>{index+1}</th>
    <td>{recipe.name}</td>
    <td>
      <div className="img-container">
      {recipe.imagePath?(<img className='img-fluid' src={`https://upskilling-egypt.com/`+recipe.imagePath} />):(<img className='img-fluid'src={avatar}/>)}

      </div>
      </td>
    <td>{recipe?.price}</td>

    <td>{recipe?.description}</td>
    <td>{recipe?.tag?.name}</td>
    <td>{recipe?.category[0]?.name}</td>
 



<td>
  <i onClick={()=>showViewModal(recipe.id)} className='fa fa-eye '></i>

</td>


   
  </tr>
  </>)}
  
  </tbody>
</table>
<nav aria-label="...">
  <ul className="pagination pagination-xs  w-50 ms-auto d-flex justify-content-end">
   {pagesArray.map((pageNo)=>    <li  className="page-item  "><a onClick={()=>getAllRecipes(pageNo,searchInput)} className="page-link">{pageNo}</a></li>
)}
    
    
    
    
    
  
  </ul>
  {/* <nav aria-label="Page navigation example">
  <ul class="pagination">
  <li class="page-item"><a onClick={()=>{previousPag()}}  class="page-link" >Previous</a></li>
   {pagesArray.map((po)=>{ return(<>
   
     <li class="page-item"><a onClick={()=>getAllRecipes(po,searchInput)} class="page-link" >{po}</a></li>
  

   </>
    
   )

   
  
   
  } )} 
   
   <li class="page-item"><a class="page-link" >Next</a></li>
  </ul>
</nav> */}
</nav>
      </div>
      :(<NoData/>)}
      
      </div>
     </div>
      
   </>
  )
}
