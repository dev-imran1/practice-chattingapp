import React, { useEffect, useState } from 'react'
import '../groupList/group.css';
import { Button } from '@mui/material'
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";

const FriendRequest = () => {

  let userData = useSelector((state) => state.logedUser.loginUser);
  const auth = getAuth();
  const db = getDatabase();
  let [fRequestlist, setfRequestlist] = useState([]);

  useEffect(() => {
    const fRequestRef = ref(db, 'friendRequest/');
    onValue(fRequestRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        if (item.val().whoreciveid == userData.uid) {
          data.push({ ...item.val(), id: item.key })
        }
      })
      setfRequestlist(data);
    });
  }, []);
// console.log(userData)


  let handelFriend = (friend) => {
    // console.log(friend.id)
    set(push(ref(db, 'friends/') ), {
      ...friend,
    }).then(()=>{
      remove(ref(db, 'friendRequest/' + friend.id)).then(() => {
        toast("friend Done");
      })
    })
  }

  let handelFCancel = (item) => {
    remove(ref(db, 'friendRequest/' + item.id)).then(() => {
      toast("Delete Done");
    })
  }
  return (
    <div className='manin__box'>
      <div className='title_friends'>
        <h3>Friend Request</h3>
      </div>
      {fRequestlist && fRequestlist.length > 0
        ?
        fRequestlist.map((item, index) => (
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
                <Button onClick={() => handelFriend(item)} variant="contained">Accept</Button>
                <Button onClick={() => handelFCancel(item)} variant="contained" color='error'>Cancel</Button>
              </div>
            </div>
          </div>
        ))
        :
        <h3 className='no_friende'>No Friend Request</h3>
      }
    </div>
  )
}

export default FriendRequest