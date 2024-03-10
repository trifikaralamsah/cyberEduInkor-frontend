import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  memberNo: null,
  name: null,
  token: null,
  expired: 0,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.memberNo = action.payload.memberNo;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.expired = action.payload.expired;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.expired = 0;
      state.memberNo = null;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
