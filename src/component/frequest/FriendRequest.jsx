import React, { useEffect, useState } from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material'
import { getDatabase, onValue, ref} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FriendRequest = () => {

  let userData = useSelector((state) => state.logedUser.loginUser);
  const auth = getAuth();
  const db = getDatabase();
  let [fRequestlist, setfRequestlist] = useState([]);

  console.log(userData.uid )
  useEffect(() => {
    const userRef = ref(db, 'friendRequest/');
    onValue(userRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        if (userData.uid != item.key) {
          data.push({ ...item.val(), id: item.key })
        }
      })
      setfRequestlist(data);
    });
  }, []);

  return (
    <div className='manin__box'>
    <div className='title_friends'>
      <h3>Friend Request</h3>
    </div>
  {fRequestlist.map((item)=>(
    <div className='item__wrapper'>
      <div className='item'>
        <div className="profile__picture">
          {/* <img src={console.log(item)} alt="" /> */}
          <img src={item.whoreciveimg} alt="" />
        </div>
        <div className="profile__details">
          <h3 className='profile__details-name'>{item.whorecivename}</h3>
          <p className='profile__details-proffsion'>{item.id}</p>
        </div>
        <div className="Request__btn">
        <Button variant="contained">add</Button>
        </div>
      </div>
      </div>
  ))}
  </div>
  )
}

export default FriendRequest