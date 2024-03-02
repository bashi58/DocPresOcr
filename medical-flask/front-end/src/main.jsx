import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import History from '../screens/History.jsx'
import Login from '../screens/Login.jsx'

import Signup from '../screens/Signup.jsx'
import Analyze from '../screens/Analyze.jsx'


const routes=createBrowserRouter([
    {path:"/",element:<App/>,children:[
        {path:"/analyze", element:<Analyze/>},
        {path:"/history", element:<History/>},
        {path:"/login", element:<Login/>},
        {path:"/signup", element:<Signup/>}
    ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes}/>
)
