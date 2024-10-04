import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteSkipassPopup } from "~features/popup/popupSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { SkipassCard } from "~shared/skipass-card";

const test = {
  number: 123456,
  duration: "8:00 - 16:00",
  cost: 3500,
  agent: "Сергей Иванов",
};

const DeleteSkipassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteSkiPassPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление ски-пасса"
      open={popupOpen}
      handleClose={() => dispatch(closeDeleteSkipassPopup())}
    >
      <SkipassCard number={test.number} />
      <DeleteText item="ски-пасса" />
      <ModalButton
        btnText="Ок"
        onClick={() => dispatch(closeDeleteSkipassPopup())}
        type="button"
      />
    </ModalComponent>
  );
};

export default DeleteSkipassPopup;
