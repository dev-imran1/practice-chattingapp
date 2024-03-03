import React, { useEffect, useState } from 'react'
import '../groupList/group.css';
import profileimg from '../../assets/profile3.png'
import { Button } from '@mui/material'
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserList = () => {

  let userData = useSelector((state) => state.logedUser.loginUser);
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
        if (userData.uid != item.key) {
          data.push({ ...item.val(), id: item.key })
        }
      })
      setUserList(data);
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

  // console.log(auth.currentUser.photoURL)
  let handelFrequest = (item) => {
    console.log(item);
    set(ref(db, 'friendRequest/' + item.id), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whosendimg: auth.currentUser.photoURL,
      whoreciveid: item.id,
      whorecivename: item.username,
      whoreciveimg: item.profile_picture
    })
  }

  let handelCancel = (item) => {
    console.log("ami cancel", item)
    remove(ref(db, 'friendRequest/'+item.id)).then(()=>{
      toast("Delete Done");
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
              {/* <img src={console.log(item)} alt="" /> */}
            </div>
            <div className="profile__details">
              <h3 className='profile__details-name'>{item.username}</h3>
              <p className='profile__details-proffsion'>{item.email}</p>
            </div>
            <div className="Request__btn">
              {friendrequest.includes(item.id + auth.currentUser.uid)
                ?
                <Button onClick={() => handelCancel(item)} variant="contained">-</Button>
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