import { Box, Grid } from '@mui/material'
import React from 'react'
import Heading from '../component/Heading'
import Logimg from '../assets/login.png';
import Google from '../assets/google.png';
import './reglog.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();

  const handelRegistration = () => {
    // navigate("/login")
  }
  return (
    <div>
      <Grid container >
        <Grid item xs={6}>
          <div className='regContainer'>
            <Heading clasName="header__reg" title="Get started with easily register" />
            <div>
              <img className='google' src={Google} alt="" />
            </div>
            <div className='regInput'>
              <TextField id="outlined-basic" label="email" variant="outlined" />
            </div>
            <div className='regInput'>
              <TextField id="outlined-basic" label="password" variant="outlined" />
            </div>
            <Button onClick={handelRegistration} variant="contained">Log in</Button>
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