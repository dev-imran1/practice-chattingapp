import React, { useEffect, useState } from 'react'
import '../groupList/group.css'
import profileimg from '../../assets/profile2.png'
import { Button } from '@mui/material';
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';
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

  let handelBlock = (item) => {
    console.log(item)
    if(item.whoreciveid == userData.uid){
      set(ref(db, 'block/' + item.id), {
        blockedname:item.whorecivename,
        blockedid:item.whoreciveid,
        blockedname:item.whorecivename,
        blockbyid: item.whosendid,
        blockbyimg:item.whosendimg,
        blockbyname:item.whosendname,
      }).then(() => {
        remove(ref(db, 'friends/' + item.id)).then(() => {
          toast("Block Done");
        })
      })
    }else{
        set(ref(db, 'block/' + item.id), {
          blockedname:item.whosendname,
          blockedid:item.whosendid,
          blockedimg:item.whosendimg,
          blockbyname:item.whorecivename,
          blockbyid: item.whoreciveid,
          blockbyimg:item.whoreciveimg
        }).then(() => {
          remove(ref(db, 'friends/' + item.id)).then(() => {
            toast("Block Done");
          })
        })
    }
  }

  let handelUnfriend = (item) => {
    remove(ref(db, 'friends/' + item.id)).then(() => {
      toast("Unfriend Done");
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
                {item.whoreciveid == userData.uid
                  ?
                  <h3 className='profile__details-name'>{item.whosendname}</h3>
                  :
                  <h3 className='profile__details-name'>{item.whorecivename}</h3>
                }
                {item.whoreciveid == userData.uid
                  ?
                  <p className='profile__details-proffsion'>{item.whosendid}</p>
                  :
                  <p className='profile__details-proffsion'>{item.whoreciveid}</p>
                }
              </div>
              <div className="Request__btn">
                <Button onClick={() => handelBlock(item)} variant="contained" color='error'>Block</Button>
                <Button onClick={() => handelUnfriend(item)} variant="contained">Unfriend</Button>
              </div>
            </div>
          </div>
        ))
        :
        <h3 className='no_friende'>No Friend Available</h3>
      }

    </div >
  )
}

export default Friends