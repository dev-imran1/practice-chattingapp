import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "data",
  initialState: {
    loginUser: localStorage.getItem("imran") ? JSON.parse(localStorage.getItem("imran")) :null ,
  },
  reducers: {
    userdata: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});
export const { userdata } = counterSlice.actions;

export default counterSlice.reducer;
