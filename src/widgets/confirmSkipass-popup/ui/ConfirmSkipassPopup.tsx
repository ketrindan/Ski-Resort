import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeConfirmSkiPassPopup,
  openDeleteSkiPassPopup,
} from "~features/popup/popupSlice";
import { clearChosenSkipass } from "~entities/skipass/skipassSlice";
import { ActionButtons } from "~shared/action-buttons";
import { CardInfo } from "~shared/card-info";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { SkipassCard } from "~shared/skipass-card";

const ConfirmSkipassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isConfirmSkiPassPopupOpen,
  );

  const data = useAppSelector((state) => state.skipasses.chosenSkipass);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Карточка ски-пасса"
      open={popupOpen}
      handleClose={() => {
        dispatch(closeConfirmSkiPassPopup());
        dispatch(clearChosenSkipass());
      }}
      headerButton={
        <ActionButtons
          onEditClick={() => console.log("edit")}
          onDeleteClick={() => {
            dispatch(closeConfirmSkiPassPopup());
            dispatch(openDeleteSkiPassPopup());
          }}
        />
      }
    >
      {data ? (
        <>
          <SkipassCard id={data.id} />
          <CardInfo title="Время действия" subtitle={data.duration} />
          <CardInfo title="Цена" subtitle={data.cost} />
          <CardInfo
            title="Назначенный посетитель"
            subtitle={data.agent?.name ?? "-"}
          />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              dispatch(closeConfirmSkiPassPopup());
              dispatch(clearChosenSkipass());
            }}
            type="button"
          />
        </>
      ) : null}
    </ModalComponent>
  );
};

export default ConfirmSkipassPopup;
