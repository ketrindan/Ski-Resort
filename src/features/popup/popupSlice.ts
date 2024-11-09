import { createSlice } from "@reduxjs/toolkit";

interface popupState {
  isAdminPopupOpen: boolean;
  isAddGuestPopupOpen: boolean;
  isAddCoachPopupOpen: boolean;
  isAddSkiPassPopupOpen: boolean;
  isEditGuestPopupOpen: boolean;
  isEditCoachPopupOpen: boolean;
  isEditSkiPassPopupOpen: boolean;
  isConfirmGuestPopupOpen: boolean;
  isConfirmCoachPopupOpen: boolean;
  isConfirmSkiPassPopupOpen: boolean;
  isDeleteGuestPopupOpen: boolean;
  isDeleteCoachPopupOpen: boolean;
  isDeleteSkiPassPopupOpen: boolean;
  isErrorPopupOpen: boolean;
  isAssignCoachToGuestPopupOpen: boolean;
  isAssignGuestToCoachPopupOpen: boolean;
  isAssignGuestToSkipassPopupOpen: boolean;
}

const initialState: popupState = {
  isAdminPopupOpen: false,
  isAddGuestPopupOpen: false,
  isAddCoachPopupOpen: false,
  isAddSkiPassPopupOpen: false,
  isEditGuestPopupOpen: false,
  isEditCoachPopupOpen: false,
  isEditSkiPassPopupOpen: false,
  isConfirmGuestPopupOpen: false,
  isConfirmCoachPopupOpen: false,
  isConfirmSkiPassPopupOpen: false,
  isDeleteGuestPopupOpen: false,
  isDeleteCoachPopupOpen: false,
  isDeleteSkiPassPopupOpen: false,
  isErrorPopupOpen: false,
  isAssignCoachToGuestPopupOpen: false,
  isAssignGuestToCoachPopupOpen: false,
  isAssignGuestToSkipassPopupOpen: false,
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
    openEditGuestPopup: (state) => {
      state.isEditGuestPopupOpen = true;
    },
    closeEditGuestPopup: (state) => {
      state.isEditGuestPopupOpen = false;
    },
    openEditCoachPopup: (state) => {
      state.isEditCoachPopupOpen = true;
    },
    closeEditCoachPopup: (state) => {
      state.isEditCoachPopupOpen = false;
    },
    openEditSkiPassPopup: (state) => {
      state.isEditSkiPassPopupOpen = true;
    },
    closeEditSkiPassPopup: (state) => {
      state.isEditSkiPassPopupOpen = false;
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
    closeDeleteSkiPassPopup: (state) => {
      state.isDeleteSkiPassPopupOpen = false;
    },
    openErrorPopup: (state) => {
      state.isErrorPopupOpen = true;
    },
    closeErrorPopup: (state) => {
      state.isErrorPopupOpen = false;
    },
    openAssignCoachToGuestPopup: (state) => {
      state.isAssignCoachToGuestPopupOpen = true;
    },
    closeAssignCoachToGuestPopup: (state) => {
      state.isAssignCoachToGuestPopupOpen = false;
    },
    openAssignGuestToCoachPopup: (state) => {
      state.isAssignGuestToCoachPopupOpen = true;
    },
    closeAssignGuestToCoachPopup: (state) => {
      state.isAssignGuestToCoachPopupOpen = false;
    },
    openAssignGuestToSkiPassPopup: (state) => {
      state.isAssignGuestToSkipassPopupOpen = true;
    },
    closeAssignGuestToSkiPassPopup: (state) => {
      state.isAssignGuestToSkipassPopupOpen = false;
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
  openEditGuestPopup,
  closeEditGuestPopup,
  openEditCoachPopup,
  closeEditCoachPopup,
  openEditSkiPassPopup,
  closeEditSkiPassPopup,
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
  closeDeleteSkiPassPopup,
  openErrorPopup,
  closeErrorPopup,
  openAssignCoachToGuestPopup,
  closeAssignCoachToGuestPopup,
  openAssignGuestToCoachPopup,
  closeAssignGuestToCoachPopup,
  openAssignGuestToSkiPassPopup,
  closeAssignGuestToSkiPassPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
