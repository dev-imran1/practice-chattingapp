import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../component/Heading'
import regimg from '../assets/regimg.png';
import './reglog.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton';



const Registration = () => {


  const auth = getAuth();
  const navigate = useNavigate();


  let initialvalues = {
    email: "",
    fullname: "",
    password: "",
    loading: false
  }
  // let errors ={
  //   mailError: "",
  //   nameError: "",
  //   passwordError:""
  // }

  let [values, setValues] = useState(initialvalues);
  let [emailError, setEmailError] = useState("")

  const handelChange = (e) => {
    ;
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handelRegistration = () => {
    setValues({
      loading:true
    })
    let { email, fullname, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast("verify your email")
        setValues({
          email: "",
          fullname: "",
          password: ""
        })

        // setEmailError({
        //   mailError: "",
        //   nameError: "",
        //   passwordError:""
        // })
        setEmailError("");
        setValues({
          loading:false
        })
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          setEmailError('your email already exits')
        }
      });
  }
  return (
    <div>
      <Grid container >
        <Grid item xs={6}>
          <div className='regContainer'>
            <Heading clasName="header__reg" title="Get started with easily register" />
            <p>Free register and you can enjoy it</p>
            <div className='regInput'>
              <TextField value={values.email} onChange={handelChange} name='email' id="outlined-basic" label="email" variant="outlined" />
              {emailError &&
                <h4>{emailError}</h4>
              }
            </div>
            <div className='regInput'>
              <TextField value={values.fullname} onChange={handelChange} name='fullname' id="outlined-basic" label="full name" variant="outlined" />
            </div>
            <div className='regInput'>
              <TextField value={values.password} onChange={handelChange} name='password' id="outlined-basic" label="password" variant="outlined" type='password' />
            </div>
            {values.loading
              ?
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <Button onClick={handelRegistration} variant="contained">Sign up</Button>
            }
          </div>

        </Grid>
        <Grid item xs={6}>
          <img className='reg_img' src={regimg} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Registration