import { createSlice } from "@reduxjs/toolkit";

interface userState {
  isLoggedIn: boolean;
  login: string;
  role: string;
  isAdminMode: boolean;
}

const initialState: userState = {
  isLoggedIn: false,
  login: "",
  role: "",
  isAdminMode: false,
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
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
  },
});

export const { logIn, logOut, toggleAdminMode } = userSlice.actions;

export default userSlice.reducer;
