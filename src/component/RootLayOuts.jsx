import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import "../component/rootlayouts.css";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import Profileimg from '../assets/profile.png'
import { useSelector } from 'react-redux';




const RootLayOuts = () => {
    let userData = useSelector((state) => state.logedUser.loginUser)
    const location = useLocation();
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <div className='navbar'>
                        <div className="nav__wrapper">
                            <ul className='root__item'>
                                <div className="profile__image">
                                    <img className="profile_img" src={Profileimg} alt="" />
                                    <h2>{userData?.displayName}</h2>
                                </div>
                                <li>
                                    <Link to='/chatting/home' className={location.pathname == '/chatting/home' ? "active" : "icon"}>
                                        <IoHomeOutline />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/chatting/message' className={location.pathname == '/chatting/message' ? "active" : "icon"}>

                                        <AiOutlineMessage />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/chatting/notification' className={location.pathname == '/chatting/notification' ? "active" : "icon"}>

                                        <IoIosNotificationsOutline />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/chatting/setting' className={location.pathname == '/chatting/setting' ? "active" : "icon"}>
                                        <IoSettingsOutline />
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/chatting/logout' className={location.pathname == '/chatting/logout' ? "active" : "icon"}>

                                        <AiOutlineLogout />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    )
}

export default RootLayOuts