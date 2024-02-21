import React from 'react'
import profileimg from '../../assets/profile.png';
import profileimg2 from '../../assets/profile2.png';
import profileimg3 from '../../assets/profile3.png';
import profileimg4 from '../../assets/profile4.png';
import '../groupList/group.css';


const Group = () => {
  return (
    <div className='manin__box'>
      <div className='title'>
        <h3>User List</h3>
        <button>:</button>
      </div>
      <div className='item'>
        <div className="profile__picture">
          <img src={profileimg} alt="" />
        </div>
        <div className="profile__details">
          <h3 className='profile__details-name'>Friends Reunion</h3>
          <h4 className='profile__details-proffsion'>Web Devloper</h4>
        </div>
        <div className="Request__btn">
          <button className='add__btn'>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Group