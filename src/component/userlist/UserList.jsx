import React, { useEffect, useState } from 'react'
import '../groupList/group.css';
import profileimg from '../../assets/profile3.png'
import { Button } from '@mui/material'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [userlist, setUserList] = useState([])

  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ ...item.val(), id: item.key })
      })
      setUserList(data)
    });
    console.log(userlist);
  }, [])


  let handelClick = (item)=>{
    console.log(item.email);
    console.log(item.id);
    console.log(item.username);
    console.log(item.profile_picture);
  }
  return (
    <div className='manin__box'>
      <div className='title__userlist'>
        <h3>UserList</h3>
      </div>
      {userlist.map((item,index) => (
        <div className='item__wrapper' key={index}>
          <div className='item' >
            <div className="profile__picture">
              <img src={item.profile_picture} alt="" />
            </div>
            <div className="profile__details">
              <h3 className='profile__details-name'>{item.username}</h3>
              <p className='profile__details-proffsion'>{item.email}</p>
            </div>
            <div className="Request__btn">
              <Button onClick={()=>handelClick(item)} variant="contained">+</Button>
            </div>
          </div>
        </div>
      ))}
      <div>
      </div>
    </div>


  )
}

export default UserList