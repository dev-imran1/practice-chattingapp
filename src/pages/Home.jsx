import React from 'react'

import Grid from '@mui/material/Grid';
import Group from '../component/groupList/Group';
import Friends from '../component/friends/Friends';
import UserList from '../component/userlist/UserList';
import BlockList from '../component/block/BlockList';
import FriendRequest from '../component/frequest/FriendRequest';
import MyGroup from '../component/mygroup/MyGroup';


const Home = () => {

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