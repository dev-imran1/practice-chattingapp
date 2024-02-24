import React from 'react'
import profileimg from '../../assets/profile.png';
import profileimg2 from '../../assets/profile2.png';
import profileimg3 from '../../assets/profile3.png';
import profileimg4 from '../../assets/profile4.png';
import '../groupList/group.css';
import { Button } from '@mui/material';


const Group = () => {
  return (
    <div className='manin__box'>
      <div className='title title__wrapper'>
        <h3>Group List</h3>
        <Button variant="contained">Contained</Button>
      </div>
      <div className='item__wrapper'>
      <div className='item'>
        <div className="profile__picture">
          <img src={profileimg} alt="" />
        </div>
        <div className="profile__details">
          <h3 className='profile__details-name'>Friends Reunion</h3>
          <p className='profile__details-proffsion'>Web Devloper</p>
        </div>
        <div className="Request__btn">
        <Button variant="contained">add</Button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Group