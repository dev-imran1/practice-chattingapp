import React from 'react'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();



  let handelLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("imran")
      toast("Your account logout");
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    })
  }


  
  return (

    <div>
      <Button onClick={handelLogOut} variant="contained">Logout</Button>
    </div>

  )
}

export default Logout