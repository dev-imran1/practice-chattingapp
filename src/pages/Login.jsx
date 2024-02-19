import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../component/Heading'
import Logimg from '../assets/login.png';
import Google from '../assets/google.png';
import './reglog.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let initialvalues = {
    email: "",
    password: "",
    loading: false,
    eye: false,
    error: ""
  }

  let [values, setValues] = useState(initialvalues);

  const handelChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handelRegistration = () => {
    let { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
      })
      navigate("/home")
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          setValues({
            ...values,
            error: "Invalid Email"
          })
        }
      });
  }

  const handelGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }

  const handelForgotpassword = () => {
    navigate("/forgotpassword")
  }

  return (
    <div>
      <Grid container >
        <Grid item xs={6}>
          <div className='regContainer'>
            <Heading clasName="header__reg" title="Get started with easily register" />
            <div>
              <img onClick={handelGoogle} className='google' src={Google} alt="" />
            </div>
            <div className='regInput'>
              <TextField onChange={handelChange} id="outlined-basic" label="email" variant="outlined" />
              {values.error && <Alert severity="warning">{values.error}</Alert>}


            </div>
            <div className='regInput'>
              <TextField onChange={handelChange} id="outlined-basic" label="password" variant="outlined" />
            </div>
            <Button onClick={handelRegistration} variant="contained">Log in</Button>
            <p>Don't have an account? <Link to='/'>Registration</Link></p>
            <p className='forgot' onClick={handelForgotpassword}>Forgot Password?</p>
          </div>

        </Grid>
        <Grid item xs={6}>
          <img className='reg_img' src={Logimg} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Login