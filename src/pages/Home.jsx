import React from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    let handelLogOut = () => {
        signOut(auth).then(() => {
            toast("Your account logout");
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div>
            <Button onClick={handelLogOut} variant="contained">Log in</Button>
        </div>
    )
}

export default Home