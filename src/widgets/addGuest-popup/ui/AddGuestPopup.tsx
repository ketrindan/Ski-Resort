import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AddGuest } from "~features/add-guest";
import { closeAddGuestPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AddGuestPopup: FC = () => {
  const popupOpen = useAppSelector((state) => state.popups.isAddGuestPopupOpen);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Добавить нового посетителя"
      open={popupOpen}
      handleClose={() => dispatch(closeAddGuestPopup())}
    >
      <AddGuest />
    </ModalComponent>
  );
};

export default AddGuestPopup;
