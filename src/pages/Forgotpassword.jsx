import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Forgotpassword = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    let [text, setText] = useState("");

    sendPasswordResetEmail(auth, text)
        .then(() => {
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        let handelClick =()=>{
            setTimeout(() => {
                navigate("/login")
            }, 1000);
            setText("");
            toast("check your email and rest your password");
        }
    return (
        <div>
            <h2>Forgot Password</h2>
            <TextField value={text} type='email' onChange={(e) => setText(e.target.value)} id="outlined-basic" label="email" variant="outlined" />
            <Button onClick={handelClick} variant="contained">Contained</Button>

        </div>
    )
}

export default Forgotpassword