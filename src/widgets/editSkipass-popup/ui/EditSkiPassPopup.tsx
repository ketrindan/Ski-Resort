import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { EditSkiPass } from "~features/edit-skipass";
import { closeEditSkiPassPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const EditSkiPassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isEditSkiPassPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Редактировать данные ски-пасса"
      open={popupOpen}
      handleClose={() => dispatch(closeEditSkiPassPopup())}
    >
      <EditSkiPass />
    </ModalComponent>
  );
};

export default EditSkiPassPopup;
