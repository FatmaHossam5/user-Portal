import { useContext } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import RequestResetPassword from './AuthModule/Components/RequestResetPassword/RequestResetPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import { AuthContext } from './Context/AuthContext'
import Home from './HomeModule/Components/Home/Home'
import FavoriteLists from './RecipesModule/Components/RecipesList/FavoriteLists'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import Authlayout from './SharedModules/Components/Authlayout/Authlayout'
import Masterlayout from './SharedModules/Components/Masterlayout/Masterlayout'
import NotFound from './SharedModules/Components/NotFound/NotFound'
import ProtectedRoute from './SharedModules/Components/ProtectedRoute/ProtectedRoute'


function App() {

  let {userData, saveUserData}= useContext(AuthContext)

 const routes=createHashRouter([
  {path:"/dashboard",
element: <ProtectedRoute userData={userData}> <Masterlayout userData={userData} />  </ProtectedRoute>,


errorElement:<NotFound/>,
children:[{index:true,element:<Home userData={userData}/>},
{path:"recipes",element:<RecipesList/>},
{path:"favorites",element:<FavoriteLists/>}

]},
  {
    path:"",
    element:  <Authlayout/> ,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Login saveUserData={saveUserData} />},
      {path:"/Register",element:<Register/>},
      {path:"/login",element:<Login saveUserData={saveUserData} />},
      {path:"/forgetPassword",element:<ForgetPassword/>},
      {path:"/RequestResetPassword",element:<RequestResetPassword/>},
      {path:"/ResetPassword",element:<ResetPassword/>},

    ]
  }
 ])

  return (
    <>
 <RouterProvider router={routes}/>
 <ToastContainer />
    </>
  )
}

export default App
