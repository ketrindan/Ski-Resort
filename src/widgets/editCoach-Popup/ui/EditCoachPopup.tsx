import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { EditCoach } from "~features/edit-coach";
import { closeEditCoachPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const EditCoachPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isEditCoachPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Редактировать данные инструктора"
      open={popupOpen}
      handleClose={() => dispatch(closeEditCoachPopup())}
    >
      <EditCoach />
    </ModalComponent>
  );
};

export default EditCoachPopup;
