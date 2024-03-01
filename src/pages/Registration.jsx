import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../component/Heading'
import regimg from '../assets/regimg.png';
import './reglog.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton';
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import Alert from '@mui/material/Alert';
import { getDatabase, ref, set, push } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  let initialvalues = {
    email: "",
    fullname: "",
    password: "",
    loading: false,
    eye: false,
    error: ""
  }

  let [values, setValues] = useState(initialvalues);
  // let [emailError, setEmailError] = useState("")

  const handelChange = (e) => {

    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handelRegistration = () => {
    let { email, fullname, password } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Type Your email"
      })
      return
    }
    if (!fullname) {
      setValues({
        ...values,
        error: "Type Your fullname"
      })
      return
    }
    if (!password) {
      setValues({
        ...values,
        error: "Type Your password"
      })
      return
    }


    setValues({
      loading: true
    })
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: values.fullname, photoURL: "https://ibb.co/k2hMw50"
        })
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              set(ref(db, 'users/' + user.user.uid), {
                username: values.fullname,
                email: values.email,
                profile_picture : user.user.photoURL
              })
              toast("verify your email")
            })
        })



        setValues({
          email: "",
          fullname: "",
          password: "",
          loading: false
        })
        navigate("/login")
      })
      .catch((error) => {
        setValues({
          loading: false
        })
        const errorCode = error.code;
        const errorMessage = error.message;
        // if (errorCode == 'auth/email-already-in-use') {
        //   setEmailError('your email already exits')
        // }
      });
  }

  // const handleEye =()=>{
  //   setValues({
  //     ...values,
  //     eye:true
  //   })
  // }
  return (
    <div>
      <Grid container >
        <Grid item xs={6}>
          <div className='regContainer'>
            <Heading clasName="header__reg" title="Get started with easily register" />
            <p>Free register and you can enjoy it</p>

            <div className='regInput'>
              <TextField value={values.email} onChange={handelChange} name='email' id="outlined-basic" label="email" variant="outlined" />
              {values.error.includes("email") && <Alert severity="warning">{values.error}</Alert>}
            </div>
            <div className='regInput'>
              <TextField value={values.fullname} onChange={handelChange} name='fullname' id="outlined-basic" label="full name" variant="outlined" />
              {values.error.includes("fullname") && <Alert severity="warning">{values.error}</Alert>}
            </div>
            <div className='regInput'>
              <TextField value={values.password} onChange={handelChange} name='password' id="outlined-basic" label="password" variant="outlined" type={values.eye ? "text" : "password"} />
              {values.error.includes("password") && <Alert severity="warning">{values.error}</Alert>}
              <div onClick={() => setValues({ ...values, eye: !values.eye })} className='eye'>
                {values.eye
                  ?
                  <AiTwotoneEye />
                  :
                  <AiOutlineEyeInvisible />
                }
              </div>
            </div>

            {values.loading
              ?
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <Button onClick={handelRegistration} variant="contained">Sign up</Button>
            }

            <p>Already have an account? <Link to='/login'>Log in</Link></p>
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