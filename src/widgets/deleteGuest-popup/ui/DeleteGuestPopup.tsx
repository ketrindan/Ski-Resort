import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { DeleteGuest } from "~features/delete-guest";
import { closeDeleteGuestPopup } from "~features/popup/popupSlice";
import { clearChosenGuest } from "~entities/guest/guestSlice";
import { ModalComponent } from "~shared/modal";

const DeleteGuestPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteGuestPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление посетителя"
      open={popupOpen}
      handleClose={() => {
        dispatch(closeDeleteGuestPopup());
        dispatch(clearChosenGuest());
      }}
    >
      <DeleteGuest />
    </ModalComponent>
  );
};

export default DeleteGuestPopup;
