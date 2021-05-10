import { createSlice } from "@reduxjs/toolkit";

const signedSlice = createSlice({
  name: "episodes",
  initialState: {
    signedIn: (localStorage.getItem('user') ? true : false),
  },
  reducers: {
    handleStateLogin(state, action) {
      state.signedIn = action.payload.status;
    },
  },
});

export const signedActions = signedSlice.actions;

export default signedSlice;
