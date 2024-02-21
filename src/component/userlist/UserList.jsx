import React from 'react'
import '../groupList/group.css';
import profileimg from '../../assets/profile3.png'
const UserList = () => {
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

export default UserList