import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Spinner, Card, Badge, Button, Row, Col, Container, Form, InputGroup } from 'react-bootstrap'
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
   const [loading,setLoading]=useState(false)
   const [addingToFavorites,setAddingToFavorites]=useState(false)
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
    setAddingToFavorites(true)
    axios.post (`${baseUrl}/userRecipe/`,{recipeId:itemId},{headers:requestHeaders}).then((response)=>{
      getToastValue('success','Added to favorites successfully!')
      handleClose()
      setAddingToFavorites(false)
    }).catch((error)=>{
      getToastValue("error",error?.response?.data?.message)
      setAddingToFavorites(false)
    })
  }
  useEffect(()=>{
    getTagId();
    getCategoryId();

getAllRecipes(1);

  },[])
  return (
    <>
      <div className='container-fluid'>
        <Header title={"Recipe Items"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
        
        {/* Modern Recipe Details Modal */}
        <Modal show={modalState==='view-modal'} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton className="border-0 pb-0 bg-gradient-primary">
            <Modal.Title className="fw-bold text-white">
              <i className="fas fa-utensils me-2"></i>
              Recipe Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="recipe-image-container position-relative">
                  {recipeDetails?.imagePath ? (
                    <img 
                      className='img-fluid rounded-4 shadow-lg' 
                      src={`https://upskilling-egypt.com/`+recipeDetails?.imagePath}
                      alt={recipeDetails?.name || 'Recipe'}
                      style={{width: '100%', height: '300px', objectFit: 'cover'}}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center bg-light rounded-4 shadow-sm" style={{height: '300px'}}>
                      <img className='img-fluid' src={DataNo} alt="No image available" style={{maxHeight: '150px'}}/>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="recipe-details">
                  <h3 className="fw-bold text-dark mb-3">{recipeDetails?.name}</h3>
                  
                  <div className="mb-4">
                    <h6 className="text-muted mb-2">
                      <i className="fas fa-tag me-2 text-success"></i>
                      Tag
                    </h6>
                    <Badge bg="success" className="px-3 py-2 fs-6 rounded-pill">
                      {recipeDetails?.tag?.name}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-muted mb-2">
                      <i className="fas fa-dollar-sign me-2 text-success"></i>
                      Price
                    </h6>
                    <span className="fs-3 fw-bold text-success">
                      ${recipeDetails?.price}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-muted mb-2">
                      <i className="fas fa-align-left me-2 text-success"></i>
                      Description
                    </h6>
                    <p className="text-dark lh-base">
                      {recipeDetails?.description || 'No description available'}
                    </p>
                  </div>

                  <div className="d-grid">
                    <Button 
                      onClick={addToFavorite} 
                      variant="success" 
                      size="lg"
                      disabled={addingToFavorites}
                      className="rounded-pill py-3 shadow-sm"
                    >
                      {addingToFavorites ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Adding to Favorites...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-heart me-2"></i>
                          Add to Favorites
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Container fluid className="px-4" style={{marginTop: '2rem'}}>
          <Row>
            <Col xs={12}>
              {/* Enhanced Modern Header Section */}
              <Card className="mb-5 border-0 shadow-lg rounded-4 modern-header-card" >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="header-icon-container me-4">
                        <i className="fas fa-utensils header-main-icon"></i>
                      </div>
                      <div>
                        <h2 className="fw-bold text-dark mb-1 header-title">
                          Recipe Collection
                        </h2>
                        <p className="text-muted mb-0 header-subtitle">
                          <i className="fas fa-sparkles me-2 text-warning"></i>
                          Discover amazing recipes from our curated collection
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="header-stats">
                        <div className="stat-item">
                          <div className="stat-number">{recipeList.length}</div>
                          <div className="stat-label">Total Recipes</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                          <div className="stat-number">{categoryList.length}</div>
                          <div className="stat-label">Categories</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Modern Search and Filter Section */}
              <Card className="mb-5 border-0 shadow-lg rounded-4" style={{marginTop: '1.5rem'}}>
                <Card.Body className="p-5">
                  <Row className="g-4 align-items-end">
                    <Col lg={4} md={6}>
                      <Form.Label className="fw-bold text-dark fs-6 mb-2">
                        <i className="fas fa-search me-2 text-success"></i>
                        Search by Name
                      </Form.Label>
                      <InputGroup className="modern-input-group">
                        <InputGroup.Text className="modern-input-addon">
                          <i className="fas fa-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control 
                          onChange={getNameValue} 
                          className='modern-form-control' 
                          placeholder='Enter recipe name...'  
                          type="text"
                          value={searchInput}
                        />
                      </InputGroup>
                    </Col>
                    
                    <Col lg={4} md={6}>
                      <Form.Label className="fw-bold text-dark fs-6 mb-2">
                        <i className="fas fa-tags me-2 text-success"></i>
                        Filter by Tag
                      </Form.Label>
                      <Form.Select 
                        onChange={getTagValue} 
                        value={searchTagId || ""} 
                        className="modern-form-select"
                      >
                        <option value="">All Tags</option>
                        {tag ? tag.map((t) => <option key={t.id} value={t.id}>{t.name}</option>) : null}
                      </Form.Select>
                    </Col>
                    
                    <Col lg={4} md={6}>
                      <Form.Label className="fw-bold text-dark fs-6 mb-2">
                        <i className="fas fa-layer-group me-2 text-success"></i>
                        Filter by Category
                      </Form.Label>
                      <Form.Select 
                        onChange={getCategoryValue} 
                        value={searchCatId || ""} 
                        className="modern-form-select"
                      >
                        <option value="">All Categories</option>
                        {categoryList ? categoryList.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>) : null}
                      </Form.Select>
                    </Col>
                  </Row>
                  
                  {/* Active Filters Display */}
                  {(searchInput || searchTagId || searchCatId) && (
                    <div className="mt-4 pt-4 border-top">
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="text-muted fw-semibold">Active filters:</span>
                        {searchInput && (
                          <Badge bg="primary" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                            <i className="fas fa-search"></i>
                            "{searchInput}"
                            <button 
                              className="btn-close btn-close-white" 
                              style={{fontSize: '0.7rem'}}
                              onClick={() => {
                                setSearchInput("")
                                getAllRecipes(1, "", searchTagId, searchCatId)
                              }}
                            ></button>
                          </Badge>
                        )}
                        {searchTagId && (
                          <Badge bg="success" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                            <i className="fas fa-tag"></i>
                            {tag.find(t => t.id == searchTagId)?.name}
                            <button 
                              className="btn-close btn-close-white" 
                              style={{fontSize: '0.7rem'}}
                              onClick={() => {
                                setSearchTagId("")
                                getAllRecipes(1, searchInput, "", searchCatId)
                              }}
                            ></button>
                          </Badge>
                        )}
                        {searchCatId && (
                          <Badge bg="info" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                            <i className="fas fa-layer-group"></i>
                            {categoryList.find(cat => cat.id == searchCatId)?.name}
                            <button 
                              className="btn-close btn-close-white" 
                              style={{fontSize: '0.7rem'}}
                              onClick={() => {
                                setSearchCatId("")
                                getAllRecipes(1, searchInput, searchTagId, "")
                              }}
                            ></button>
                          </Badge>
                        )}
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => {
                            setSearchInput("")
                            setSearchTagId("")
                            setSearchCatId("")
                            getAllRecipes(1)
                          }}
                          className="rounded-pill px-3"
                        >
                          <i className="fas fa-times me-1"></i>
                          Clear All
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Table Header Section */}
          <Card className="mb-4 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center mb-2">
                    <div className="table-icon me-3">
                      <i className="fas fa-table text-success fs-3"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1">
                        <i className="fas fa-list-alt me-2 text-success"></i>
                        Recipes Data Table
                      </h4>
                      <p className="text-muted mb-0">
                        Browse and explore all available recipes in an organized table format
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-md-end">
                  <div className="d-flex flex-column align-items-md-end">
                    <Badge bg="light" text="dark" className="px-3 py-2 mb-2 rounded-pill">
                      <i className="fas fa-database me-2 text-success"></i>
                      {recipeList.length} Total Recipes
                    </Badge>
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Click "View" to see full details
                    </small>
                  </div>
                </div>
              </div>
              
              {/* Table Usage Guide */}
              <div className="row mt-3 pt-3 border-top">
                <div className="col-12">
                  <div className="d-flex flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-search text-primary me-2"></i>
                      <small className="text-muted">Use search & filters above to find specific recipes</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-mouse-pointer text-info me-2"></i>
                      <small className="text-muted">Hover over rows for enhanced view</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-eye text-success me-2"></i>
                      <small className="text-muted">Click "View" button to see recipe details</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-mobile-alt text-warning me-2"></i>
                      <small className="text-muted">Table is fully responsive for all devices</small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Modern Styled Table */}
          {recipeList.length > 0 ? (
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 modern-table">
                  <thead className="table-header-modern">
                    <tr>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-hashtag mb-1"></i>
                          <span>Serial</span>
                          <small className="opacity-75">Number</small>
                        </div>
                      </th>
                      <th scope="col" className="fw-bold ">
                        <div className="d-flex flex-column ">
                          <i className="fas fa-utensils mb-1"></i>
                          <span>Recipe</span>
                          <small className="opacity-75">Name & ID</small>
                        </div>
                      </th>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-image mb-1"></i>
                          <span>Recipe</span>
                          <small className="opacity-75">Image</small>
                        </div>
                      </th>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-dollar-sign mb-1"></i>
                          <span>Price</span>
                          <small className="opacity-75">Cost</small>
                        </div>
                      </th>
                      <th scope="col" className="fw-bold ">
                        <div className="d-flex flex-column">
                          <i className="fas fa-align-left mb-1"></i>
                          <span>Recipe</span>
                          <small className="opacity-75">Description</small>
                        </div>
                      </th>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-tag mb-1"></i>
                          <span>Recipe</span>
                          <small className="opacity-75">Tag</small>
                        </div>
                      </th>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-layer-group mb-1"></i>
                          <span>Recipe</span>
                          <small className="opacity-75">Category</small>
                        </div>
                      </th>
                      <th scope="col" className="text-center fw-bold ">
                        <div className="d-flex flex-column align-items-center">
                          <i className="fas fa-cogs mb-1"></i>
                          <span>Available</span>
                          <small className="opacity-75">Actions</small>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipeList.map((recipe, index) => (
                      <tr key={recipe.id} className="table-row-modern">
                        <td className="text-center">
                          <div className="recipe-number-badge">
                            <span className="fw-bold text-muted">{index + 1}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <h6 className="mb-0 fw-bold text-dark recipe-name">{recipe.name}</h6>
                              <small className="text-muted">
                                <i className="fas fa-clock me-1"></i>
                                Recipe ID: {recipe.id}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="recipe-image-container">
                            {recipe.imagePath ? (
                              <img 
                                className='recipe-thumbnail' 
                                src={`https://upskilling-egypt.com:3006/`+recipe.imagePath}
                                alt={recipe.name}
                              />
                            ) : (
                              <div className="recipe-placeholder">
                                <img className='img-fluid' src={avatar} alt="No image"/>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="price-display">
                            <span className="fw-bold text-success fs-5">
                              ${recipe?.price}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="description-container">
                            <p className="mb-0 text-muted recipe-description">
                              {recipe?.description || 'No description available'}
                            </p>
                          </div>
                        </td>
                        <td className="text-center">
                          <Badge bg="success" className="px-3 py-2 rounded-pill shadow-sm">
                            <i className="fas fa-tag me-1"></i>
                            {recipe?.tag?.name}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Badge bg="info" className="px-3 py-2 rounded-pill shadow-sm">
                            <i className="fas fa-layer-group me-1"></i>
                            {recipe?.category[0]?.name}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => showViewModal(recipe.id)}
                            className="btn-modern-table rounded-pill px-3 py-2"
                            title="View Recipe Details"
                          >
                            <i className="fas fa-eye me-1"></i>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div className="text-center py-5">
              <NoData/>
            </div>
          )}
          
          {/* Modern Pagination */}
          {pagesArray.length > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Recipe pagination">
                <ul className="pagination pagination-lg">
                  {pagesArray.map((pageNo) => (
                    <li key={pageNo} className="page-item">
                      <button 
                        onClick={() => getAllRecipes(pageNo, searchInput, searchTagId, searchCatId)} 
                        className="page-link rounded-pill mx-1 border-0 shadow-sm"
                        style={{
                          minWidth: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600',
                          backgroundColor: '#f8f9fa',
                          color: '#495057'
                        }}
                      >
                        {pageNo}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}
