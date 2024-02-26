import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    loginUser: null,
  },
  reducers: {
    userdata: (state) => {
      console.log("redex")
    },
  },
})
export const { userdata } = counterSlice.actions

export default counterSlice.reducer