import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userSlice.js'


export default configureStore({
  reducer: {
    logedUser: userReducer,
  },
})