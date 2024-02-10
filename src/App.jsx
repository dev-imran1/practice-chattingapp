import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}/>
      <Route path="/login" element={<Login />}/>
    </Route>
    ))

function App() {

  return (
    <>
        <RouterProvider router={router}
  />
    </>
  )
}

export default App
