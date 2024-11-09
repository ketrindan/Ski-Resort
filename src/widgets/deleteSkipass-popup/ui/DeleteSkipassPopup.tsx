import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { DeleteSkipass } from "~features/delete-skipass";
import { closeDeleteSkiPassPopup } from "~features/popup/popupSlice";
import { clearChosenSkipass } from "~entities/skipass/skipassSlice";
import { ModalComponent } from "~shared/modal";

const DeleteSkipassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteSkiPassPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление ски-пасса"
      open={popupOpen}
      handleClose={() => {
        dispatch(closeDeleteSkiPassPopup());
        dispatch(clearChosenSkipass());
      }}
    >
      <DeleteSkipass />
    </ModalComponent>
  );
};

export default DeleteSkipassPopup;
