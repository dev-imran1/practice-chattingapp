import React, { useEffect, useState } from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material';
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { toast } from 'react-toastify';

const Friends = () => {
  let userData = useSelector((state) => state.logedUser.loginUser);
  const auth = getAuth();
  const db = getDatabase();
  let [friendlist, setFriendtlist] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, 'friends/');
    onValue(friendRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        if (item.val().whoreciveid == userData.uid || item.val().whosendid == userData.uid) {
          data.push({ ...item.val(), id: item.key })
        }
      })
      setFriendtlist(data);
    });
  }, []);

  let handelBlock =(item)=>{
    console.log(item)
    // console.log('blok')
    set(ref(db, 'block/' + item.id), {
      ...item,
    })
    .then(()=>{
      remove(ref(db, 'friends/' + item.id)).then(() => {
        toast("Block Done");
      })
    })
  }

  return (
    <div className='manin__box'>
      <div className='title_friends'>
        <h3>Friends</h3>
      </div>
      {friendlist && friendlist.length > 0
        ?
        friendlist.map((item, index) => (
          <div key={index} className='item__wrapper'>
            <div className='item'>
              <div className="profile__picture">
                <img src={item.whosendimg} alt="" />
              </div>
              <div className="profile__details">
                <h3 className='profile__details-name'>{item.whosendname}</h3>
                <p className='profile__details-proffsion'>{item.whosendid}</p>
              </div>
              <div className="Request__btn">
                <Button onClick={()=>handelBlock(item)} variant="contained">Block</Button>
                {/* <Button variant="contained">add</Button> */}
              </div>
            </div>
          </div>
        ))
        :
        <h3 className='no_friende'>No Friend Available</h3>
      }

    </div>
  )
}

export default Friends