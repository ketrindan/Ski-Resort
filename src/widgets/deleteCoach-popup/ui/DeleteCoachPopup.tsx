import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { DeleteCoach } from "~features/delete-coach";
import { closeDeleteCoachPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const DeleteCoachPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteCoachPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление инструктора"
      open={popupOpen}
      handleClose={() => dispatch(closeDeleteCoachPopup())}
    >
      <DeleteCoach />
    </ModalComponent>
  );
};

export default DeleteCoachPopup;
