import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { DeleteCoach } from "~features/delete-coach";
import { closeDeleteCoachPopup } from "~features/popup/popupSlice";
import { clearChosenCoach } from "~entities/coach/coachSlice";
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
      handleClose={() => {
        dispatch(closeDeleteCoachPopup());
        dispatch(clearChosenCoach());
      }}
    >
      <DeleteCoach />
    </ModalComponent>
  );
};

export default DeleteCoachPopup;
