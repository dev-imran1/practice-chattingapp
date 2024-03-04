import React, { useEffect, useState } from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material'
// import { getDatabase, onValue, ref } from "firebase/database";
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
    console.log(friend.id)
    set(ref(db, 'friends/' + friend.id), {
      ...friend,
        // whosendername: friend.whosendname,
        // whosenderid: friend.whosendid,
        // whoreciverid:userData.uid,
        // whorecivername:userData.displayName
    }).then(()=>{
      remove(ref(db, 'friendRequest/' + friend.id)).then(() => {
        toast("friends Done");
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
                {/* <img src={console.log(item)} alt="" /> */}
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
        <h3 className='no_friende'>No Friend Available</h3>
      }
    </div>
  )
}

export default FriendRequest