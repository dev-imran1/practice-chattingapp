import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { BsEmojiGrin } from "react-icons/bs";
import { BsEmojiFrownFill } from "react-icons/bs";
import { userdata } from '../slice/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // let loginUser = useSelector((state => state.logedUser.loginUser));


  // useEffect(() => {
  //   if (loginUser == null) {
  //     navigate("/login")
  //   }
  // }, [])
  let initialvalues = {
    email: "",
    password: "",
    loading: false,
    eye: false,
    error: ""
  }

  let [values, setValues] = useState(initialvalues);
  let [open, setOpen] = useState("");

  const handelChange = (e) => {

    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handelRegistration = () => {
    let { email, password } = values

    if (!email) {
      setValues({
        ...values,
        error: "type your email"
      })
      return
    }
    if (!password) {
      setValues({
        ...values,
        error: "type your password"
      })
      return
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast("account login done")
        dispatch(userdata(user.user))
        localStorage.setItem("imran", JSON.stringify(user.user))
        navigate("/chatting/home")
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-credential") {
          setValues({
            ...values,
            password: "",
            error: "Invalid Password"
          })
          return
        }
        if (errorCode == "auth/invalid-email") {
          setValues({
            ...values,
            email: "",
            error: "Invalid Email"
          })
          return
        }
        if (errorCode == "auth/too-many-requests") {
          setValues({
            ...values,
            error: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          })
        }
      });
  }

  const handelGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
              <TextField name='email' onChange={handelChange} id="outlined-basic" label="email" variant="outlined" />
              {values.error.includes("Email") && <Alert severity="warning">{values.error}</Alert>}
              {values.error.includes("email") && <Alert severity="warning">{values.error}</Alert>}
              {values.error.includes("disabled") && <Alert severity="warning">{values.error}</Alert>}
            </div>
            <div className='regInput'>
              <TextField name='password' onChange={handelChange} id="outlined-basic" label="password" variant="outlined" type={open ? "text" : "password"} />
              {open
                ?
                <BsEmojiGrin className='eye_login' onClick={() => setOpen(false)} />
                :
                <BsEmojiFrownFill className='eye_login' onClick={() => setOpen(true)} />
              }
              {values.error.includes("Password") && <Alert severity="warning">{values.error}</Alert>}
              {values.error.includes("password") && <Alert severity="warning">{values.error}</Alert>}
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