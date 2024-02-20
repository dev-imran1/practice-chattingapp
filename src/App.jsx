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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from './pages/Forgotpassword';
import Home from './pages/Home';
import RootLayOuts from './component/RootLayOuts';
import Message from './pages/Message'
import Notificaton from './pages/Notification'
import Setting from './pages/Setting'
import Logout from './pages/Logout'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgotpassword" element={<Forgotpassword />}></Route>

      <Route path="/chatting" element={<RootLayOuts />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="notification" element={<Notificaton />}></Route>
        <Route path="setting" element={<Setting />}></Route>
        <Route path="logout" element={<Logout />}></Route>
      </Route>

    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
