import React, { useEffect, useState } from 'react'
import '../groupList/group.css';
import profileimg from '../../assets/profile3.png'
import { Button } from '@mui/material'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [userlist, setUserList] = useState([]);
  let [friendrequest, setFriendrequest] = useState([]);


  // bujte parchi
  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ ...item.val(), id: item.key })
      })
      setUserList(data)
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, 'friendRequest/');
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreciveid + item.val().whosendid)
      })
      setFriendrequest(arr)
    });
  }, [])

  // bujte parchi
  let handelFrequest = (item) => {
    set(ref(db, 'friendRequest/'+item.id), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whoreciveid: item.id,
      whorecivename: item.username
    })
  }

  return (
    <div className='manin__box'>
      <div className='title__userlist'>
        <h3>UserList</h3>
      </div>
      {userlist.map((item, index) => (
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
              {friendrequest.includes(item.id+auth.currentUser.uid)
                ?
                <Button variant="contained">-</Button>
                :
                <Button onClick={() => handelFrequest(item)} variant="contained">send</Button>
              }
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