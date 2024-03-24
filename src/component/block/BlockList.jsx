import React, { useEffect, useState } from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material'
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';


const BlockList = () => {

  let userData = useSelector((state) => state.logedUser.loginUser);
  const auth = getAuth();
  const db = getDatabase();
  let [friendlist, setFriendtlist] = useState([]);


  useEffect(() => {
    const friendRef = ref(db, 'block/');
    onValue(friendRef, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        if (item.val().blockedid == userData.uid || item.val().blockbyid == userData.uid) {
          data.push({ ...item.val(), id: item.key })
        }
      })
      setFriendtlist(data);
    });
  }, []);

  let handelBlock = (item) => {
    remove(ref(db, 'block/' + item.id)).then(() => {
      toast("Block Done");
    })
  }
  return (
    <div className='manin__box'>
      <div className='title_friends'>
        <h3>Block List</h3>
      </div>
      {
        friendlist && friendlist.length > 0
          ?
          friendlist.map((items, index) => (

            <div key={index} className='item__wrapper'>
              <div className='item'>
                <div className="profile__picture">
                  {items.blockbyid == userData.uid
                  ?
                  <img src={items.blockbyimg} alt="" />
                  :
                  <img src={items.blockedimg} alt="" />
                }
                </div>
                <div className="profile__details">
                  {items.blockedid == userData.uid
                  ?
                  <h3 className='profile__details-name'>{items.blockbyname}</h3>
                  :
                  <h3 className='profile__details-name'>{items.blockedname}</h3>
                }
                  <p className='profile__details-proffsion'>Web Devloper</p>
                </div>
                <div className="Request__btn">
                  <Button onClick={() => handelBlock(items)} variant="contained">Unblock</Button>
                </div>
              </div>
            </div>
          ))
          :
          <h3 className='no_friende'>Block not Available</h3>
      }
    </div>
  )
}

export default BlockList