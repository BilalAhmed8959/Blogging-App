import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Ueser from './Pages/Ueser'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const router = createBrowserRouter([{
  path:"",
  element:<Layout/>,
  children:[{
    path:"",
    element:<Home/>
  },{
    path:"dashboard",
    element:<Dashboard/>
  },{
    path:"ueser",
    element:<Ueser/>,

  },{
    path:"profile",
    element:<Profile/>
  },{
    path:"login",
    element:<Login/>
  },{
    path:"signup",
    element:<Signup/>
  }
]
}])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
  
)
