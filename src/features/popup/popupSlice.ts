import { createSlice } from "@reduxjs/toolkit";

interface popupState {
  isAdminPopupOpen: boolean;
  isAddGuestPopupOpen: boolean;
  isAddCoachPopupOpen: boolean;
  isAddSkiPassPopupOpen: boolean;
  isConfirmGuestPopupOpen: boolean;
  isConfirmCoachPopupOpen: boolean;
  isConfirmSkiPassPopupOpen: boolean;
  isDeleteGuestPopupOpen: boolean;
  isDeleteCoachPopupOpen: boolean;
  isDeleteSkiPassPopupOpen: boolean;
  isErrorPopupOpen: boolean;
}

const initialState: popupState = {
  isAdminPopupOpen: false,
  isAddGuestPopupOpen: false,
  isAddCoachPopupOpen: false,
  isAddSkiPassPopupOpen: false,
  isConfirmGuestPopupOpen: false,
  isConfirmCoachPopupOpen: false,
  isConfirmSkiPassPopupOpen: false,
  isDeleteGuestPopupOpen: false,
  isDeleteCoachPopupOpen: false,
  isDeleteSkiPassPopupOpen: false,
  isErrorPopupOpen: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openAdminPopup: (state) => {
      state.isAdminPopupOpen = true;
    },
    closeAdminPopup: (state) => {
      state.isAdminPopupOpen = false;
    },
    openAddGuestPopup: (state) => {
      state.isAddGuestPopupOpen = true;
    },
    closeAddGuestPopup: (state) => {
      state.isAddGuestPopupOpen = false;
    },
    openAddCoachPopup: (state) => {
      state.isAddCoachPopupOpen = true;
    },
    closeAddCoachPopup: (state) => {
      state.isAddCoachPopupOpen = false;
    },
    openAddSkiPassPopup: (state) => {
      state.isAddSkiPassPopupOpen = true;
    },
    closeAddSkiPassPopup: (state) => {
      state.isAddSkiPassPopupOpen = false;
    },
    openConfirmGuestPopup: (state) => {
      state.isConfirmGuestPopupOpen = true;
    },
    closeConfirmGuestPopup: (state) => {
      state.isConfirmGuestPopupOpen = false;
    },
    openConfirmCoachPopup: (state) => {
      state.isConfirmCoachPopupOpen = true;
    },
    closeConfirmCoachPopup: (state) => {
      state.isConfirmCoachPopupOpen = false;
    },
    openConfirmSkiPassPopup: (state) => {
      state.isConfirmSkiPassPopupOpen = true;
    },
    closeConfirmSkiPassPopup: (state) => {
      state.isConfirmSkiPassPopupOpen = false;
    },
    openDeleteGuestPopup: (state) => {
      state.isDeleteGuestPopupOpen = true;
    },
    closeDeleteGuestPopup: (state) => {
      state.isDeleteGuestPopupOpen = false;
    },
    openDeleteCoachPopup: (state) => {
      state.isDeleteCoachPopupOpen = true;
    },
    closeDeleteCoachPopup: (state) => {
      state.isDeleteCoachPopupOpen = false;
    },
    openDeleteSkiPassPopup: (state) => {
      state.isDeleteSkiPassPopupOpen = true;
    },
    closeDeleteSkipassPopup: (state) => {
      state.isDeleteSkiPassPopupOpen = false;
    },
    openErrorPopup: (state) => {
      state.isErrorPopupOpen = true;
    },
    closeErrorPopup: (state) => {
      state.isErrorPopupOpen = false;
    },
  },
});

export const {
  openAdminPopup,
  closeAdminPopup,
  openAddGuestPopup,
  closeAddGuestPopup,
  openAddCoachPopup,
  closeAddCoachPopup,
  openAddSkiPassPopup,
  closeAddSkiPassPopup,
  openConfirmGuestPopup,
  closeConfirmGuestPopup,
  openConfirmCoachPopup,
  closeConfirmCoachPopup,
  openConfirmSkiPassPopup,
  closeConfirmSkiPassPopup,
  openDeleteGuestPopup,
  closeDeleteGuestPopup,
  openDeleteCoachPopup,
  closeDeleteCoachPopup,
  openDeleteSkiPassPopup,
  closeDeleteSkipassPopup,
  openErrorPopup,
  closeErrorPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
