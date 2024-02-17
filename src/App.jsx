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


const router = createBrowserRouter([
  {
    path:"/", element: <Registration/>
  },
  {
    path:"/login", element: <Login />
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router}
      />
    </>
  )
}

export default App
