import { useState } from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from './pages/Forgotpassword';


const router = createBrowserRouter([
  {
    path:"/", element: <Registration/>
  },
  {
    path:"/login", element: <Login />
  },
  {
    path:"/forgotpassword", element: <Forgotpassword />
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  )
}

export default App
