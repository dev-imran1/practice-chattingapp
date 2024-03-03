import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Group from '../component/groupList/Group';
import Friends from '../component/friends/Friends';
import UserList from '../component/userlist/UserList';
import BlockList from '../component/block/BlockList';
import FriendRequest from '../component/frequest/FriendRequest';
import MyGroup from '../component/mygroup/MyGroup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    let loginUser = useSelector((state) => state.logedUser.loginUser);

    
    useEffect(() => {
        if (loginUser == null) {
            navigate("/login")
        }
    }, [])

    return (

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
                <Grid item xs={4}>
                    <BlockList />
                </Grid>
                <Grid item xs={4}>
                    <FriendRequest />
                </Grid>
                <Grid item xs={4}>
                    <MyGroup />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home