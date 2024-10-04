import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeConfirmSkiPassPopup } from "~features/popup/popupSlice";
import { ActionButtons } from "~shared/action-buttons";
import { CardInfo } from "~shared/card-info";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { SkipassCard } from "~shared/skipass-card";

const ConfirmSkipassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isConfirmSkiPassPopupOpen,
  );

  const dispatch = useAppDispatch();

  const test = {
    number: 123456,
    duration: "8:00 - 16:00",
    cost: 3500,
    agent: "Сергей Иванов",
  };

  return (
    <ModalComponent
      title="Карточка ски-пасса"
      open={popupOpen}
      handleClose={() => dispatch(closeConfirmSkiPassPopup())}
      headerButton={
        <ActionButtons
          onEditClick={() => console.log("edit")}
          onDeleteClick={() => console.log("delete")}
        />
      }
    >
      <SkipassCard number={test.number} />
      <CardInfo title="Время действия" subtitle={test.duration} />
      <CardInfo title="Цена" subtitle={test.cost} />
      <CardInfo title="Назначенный посетитель" subtitle={test.agent} />
      <ModalButton
        btnText="Ок"
        onClick={() => dispatch(closeConfirmSkiPassPopup())}
        type="button"
      />
    </ModalComponent>
  );
};

export default ConfirmSkipassPopup;
