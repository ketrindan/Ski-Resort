import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AddCoach } from "~features/add-coach";
import { closeAddCoachPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AddCoachPopup: FC = () => {
  const popupOpen = useAppSelector((state) => state.popups.isAddCoachPopupOpen);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Добавить нового инструктора"
      open={popupOpen}
      handleClose={() => dispatch(closeAddCoachPopup())}
    >
      <AddCoach />
    </ModalComponent>
  );
};

export default AddCoachPopup;
