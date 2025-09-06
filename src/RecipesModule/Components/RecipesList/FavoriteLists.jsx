
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Spinner, Card, Badge, Button, Row, Col, Container } from 'react-bootstrap'
import Header from '../../../SharedModules/Components/Header/Header'
import { AuthContext } from '../../../Context/AuthContext'
import axios from 'axios'
import avatar from '../../../assets/imgs/avatar.png'
import { ToastContext } from '../../../Context/ToastContext'
import DataNo from '../../../assets/imgs/DataNo.svg'
import NoData from '../../../SharedModules/Components/NoData/NoData'


export default function FavoriteLists() {
  const [favList, setFavList] = useState([])
  const [itemId, setItemId] = useState(0)
  const [pagesArray, setPagesArray] = useState([])
  const [modalState, setModalState] = useState("close")
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const {baseUrl, requestHeaders} = useContext(AuthContext)
  const {getToastValue} = useContext(ToastContext)

  const handleClose = () => setModalState("close");

const getAllFavorites = (pageNo) => {
  setLoading(true)
  axios.get(`${baseUrl}/userRecipe`, {
    headers: requestHeaders,
    params: { pageNumber: pageNo }
  }).then((response) => {
    setFavList(response?.data?.data)
    setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
    setLoading(false)
  }).catch((error) => {
    getToastValue('error', error.response.data.message)
    setLoading(false)
  })
}


const showDeleteModal = (id) => {
  setModalState("view-modal")
  setItemId(id)
}

const deleteFav = () => {
  setDeleting(true)
  axios.delete(`${baseUrl}/userRecipe/${itemId}`, {headers: requestHeaders}).then((response) => {
    handleClose()
    getToastValue('success', 'Deleted Successfully')
    getAllFavorites(1)
    setDeleting(false)
  }).catch((error) => {
    getToastValue('error', error?.response?.data?.message)
    setDeleting(false)
  })
}
  useEffect(() => {getAllFavorites(1)}, [])
  
  return (
    <>
      <div className='container-fluid'>
        <Header title={"Favorite Recipes"} paragraph={'Manage your favorite recipes collection. You can view details and remove items from your favorites.'}/>
        
        {/* Modern Delete Confirmation Modal */}
        <Modal show={modalState === 'view-modal'} onHide={handleClose} centered>
          <Modal.Header closeButton className="border-0 pb-3 bg-gradient-danger">
            <Modal.Title className="fw-bold text-white">
              <i className="fas fa-trash-alt me-2"></i>
              Remove from Favorites
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="text-center py-4">
              <div className="mb-4">
                <img className="img-fluid" src={DataNo} alt="Delete confirmation" style={{maxHeight: '120px'}} />
              </div>
              <h5 className="fw-bold text-dark mb-3">Remove This Favorite Recipe?</h5>
              <p className="text-muted mb-4">
                Are you sure you want to remove this recipe from your favorites? This action cannot be undone.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  variant="outline-secondary" 
                  onClick={handleClose}
                  className="px-4 py-2 rounded-pill"
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={deleteFav}
                  disabled={deleting}
                  className="px-4 py-2 rounded-pill"
                >
                  {deleting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Removing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash-alt me-2"></i>
                      Remove from Favorites
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Container fluid className="px-4" style={{marginTop: '2rem'}}>
          <Row>
            <Col xs={12}>
              {/* Enhanced Modern Header Section */}
              <Card className="mb-5 border-0 shadow-lg rounded-4 modern-header-card">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="header-icon-container me-4">
                        <i className="fas fa-heart header-main-icon"></i>
                      </div>
                      <div>
                        <h2 className="fw-bold text-dark mb-1 header-title">
                          Favorite Recipes
                        </h2>
                        <p className="text-muted mb-0 header-subtitle">
                          <i className="fas fa-sparkles me-2 text-warning"></i>
                          Your personal collection of favorite recipes
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="header-stats">
                        <div className="stat-item">
                          <div className="stat-number">{favList.length}</div>
                          <div className="stat-label">Favorite Recipes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Favorites Grid Section */}
              <Card className="mb-4 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-2">
                        <div className="table-icon me-3">
                          <i className="fas fa-heart text-danger fs-3"></i>
                        </div>
                        <div>
                          <h4 className="fw-bold text-dark mb-1">
                            <i className="fas fa-list-alt me-2 text-danger"></i>
                            Your Favorites Collection
                          </h4>
                          <p className="text-muted mb-0">
                            Browse and manage your favorite recipes in a beautiful grid layout
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <div className="d-flex flex-column align-items-md-end">
                        <Badge bg="light" text="dark" className="px-3 py-2 mb-2 rounded-pill">
                          <i className="fas fa-heart me-2 text-danger"></i>
                          {favList.length} Favorite Recipes
                        </Badge>
                        <small className="text-muted">
                          <i className="fas fa-info-circle me-1"></i>
                          Click the heart icon to remove from favorites
                        </small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Favorites Grid */}
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="success" size="lg" />
                  <p className="mt-3 text-muted">Loading your favorite recipes...</p>
                </div>
              ) : favList.length > 0 ? (
                <Row className="g-4">
                  {favList.map((fav, index) => (
                    <Col key={fav.id} xs={12} sm={6} md={4} lg={3}>
                      <Card className="h-100 border-0 shadow-lg rounded-4 recipe-card overflow-hidden">
                        <div className="position-relative">
                          {fav?.recipe?.imagePath ? (
                            <img 
                              className="card-img-top" 
                              src={`https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`}
                              alt={fav?.recipe?.name}
                              style={{height: '200px', objectFit: 'cover'}}
                            />
                          ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{height: '200px'}}>
                              <img className="img-fluid" src={avatar} alt="No image" style={{maxHeight: '100px'}} />
                            </div>
                          )}
                          <div className="position-absolute top-0 end-0 m-3">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => showDeleteModal(fav?.id)}
                              className="rounded-circle p-2 shadow-sm"
                              title="Remove from favorites"
                            >
                              <i className="fas fa-heart-broken"></i>
                            </Button>
                          </div>
                          <div className="position-absolute top-0 start-0 m-3">
                            <Badge bg="success" className="px-3 py-2 rounded-pill shadow-sm">
                              <i className="fas fa-heart me-1"></i>
                              Favorite
                            </Badge>
                          </div>
                        </div>
                        <Card.Body className="p-4">
                          <h5 className="card-title fw-bold text-dark mb-2">
                            {fav?.recipe?.name}
                          </h5>
                          <div className="mb-3">
                            <Badge bg="info" className="px-3 py-2 rounded-pill">
                              <i className="fas fa-tag me-1"></i>
                              {fav?.recipe?.tag?.name}
                            </Badge>
                          </div>
                          {fav?.recipe?.price && (
                            <div className="mb-3">
                              <span className="fw-bold text-success fs-5">
                                <i className="fas fa-dollar-sign me-1"></i>
                                {fav?.recipe?.price}
                              </span>
                            </div>
                          )}
                          {fav?.recipe?.description && (
                            <p className="card-text text-muted small">
                              {fav?.recipe?.description.length > 100 
                                ? `${fav?.recipe?.description.substring(0, 100)}...` 
                                : fav?.recipe?.description
                              }
                            </p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5">
                  <NoData />
                  <h5 className="mt-3 text-muted">No Favorite Recipes Yet</h5>
                  <p className="text-muted">Start adding recipes to your favorites to see them here!</p>
                </div>
              )}
              
              {/* Modern Pagination */}
              {pagesArray.length > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <nav aria-label="Favorites pagination">
                    <ul className="pagination pagination-lg">
                      {pagesArray.map((pageNo) => (
                        <li key={pageNo} className="page-item">
                          <button 
                            onClick={() => getAllFavorites(pageNo)} 
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
