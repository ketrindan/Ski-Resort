import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { EditGuest } from "~features/edit-guest";
import { closeEditGuestPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const EditGuestPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isEditGuestPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Редактировать данные посетителя"
      open={popupOpen}
      handleClose={() => dispatch(closeEditGuestPopup())}
    >
      <EditGuest />
    </ModalComponent>
  );
};

export default EditGuestPopup;
