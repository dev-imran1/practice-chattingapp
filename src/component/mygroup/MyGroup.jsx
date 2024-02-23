import React from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material'

const MyGroup = () => {
  return (
    <div className='manin__box'>
      <div className='title title__wrapper'>
        <h3>My Group</h3>
        <Button variant="contained">Create Group</Button>

      </div>
      <div className='item__wrapper'>
        {[0, 1, 2, 3, 4, 5, 6].map(() => (
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
        ))}
      </div>
    </div>
  )
}

export default MyGroup