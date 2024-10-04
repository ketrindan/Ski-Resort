import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AddSkiPass } from "~features/add-skipass";
import { closeAddSkiPassPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AddSkiPassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isAddSkiPassPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Добавить новый ски-пасс"
      open={popupOpen}
      handleClose={() => dispatch(closeAddSkiPassPopup())}
    >
      <AddSkiPass />
    </ModalComponent>
  );
};

export default AddSkiPassPopup;
