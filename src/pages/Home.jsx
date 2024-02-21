import React from 'react'
// import Button from '@mui/material/Button';
// import { getAuth, signOut } from "firebase/auth";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Group from '../component/groupList/Group';
import Friends from '../component/friends/Friends';
import UserList from '../component/userlist/UserList';


const Home = () => {
    // const auth = getAuth();
    // const navigate = useNavigate();
    // let handelLogOut = () => {
    //     signOut(auth).then(() => {
    //         toast("Your account logout");
    //         setTimeout(() => {
    //             navigate("/login")
    //         }, 1000)
    //     }).catch((error) => {
    //         // An error happened.
    //     });
    // }
    return (
        // <div>
        //     <Button onClick={handelLogOut} variant="contained">Log in</Button>
        // </div>
        <div >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Group />
                </Grid>
                <Grid item xs={4}>
                    <Friends />
                </Grid>
                <Grid item xs={4}>
                    <UserList />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home