import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "~features/popup/popupSlice";
import coachReducer from "~entities/coach/coachSlice";
import guestReducer from "~entities/guest/guestSlice";
import userReducer from "~entities/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    popups: popupReducer,
    guests: guestReducer,
    coaches: coachReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
