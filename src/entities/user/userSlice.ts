import { createSlice } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: boolean;
  login: string;
  role: string;
}

const initialState: userState = {
  isLoggedIn: false,
  login: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.login = action.payload.name;
      state.role = action.payload.role;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.login = "";
      state.role = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
