import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeConfirmGuestPopup,
  openDeleteGuestPopup,
} from "~features/popup/popupSlice";
import { clearChosenGuest } from "~entities/guest/guestSlice";
import { ActionButtons } from "~shared/action-buttons";
import { CardInfo } from "~shared/card-info";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

const ConfirmGuestPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isConfirmGuestPopupOpen,
  );

  const data = useAppSelector((state) => state.guests.chosenGuest);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Карточка посетителя"
      open={popupOpen}
      handleClose={() => {
        dispatch(closeConfirmGuestPopup());
        dispatch(clearChosenGuest());
      }}
      headerButton={
        <ActionButtons
          onEditClick={() => console.log("edit")}
          onDeleteClick={() => {
            dispatch(closeConfirmGuestPopup());
            dispatch(openDeleteGuestPopup());
          }}
        />
      }
    >
      {data ? (
        <>
          <PersonCard name={`${data.name} ${data?.surname}`} />
          <CardInfo title="Дата рождения" subtitle={data.birthDate} />
          <CardInfo title="Номер ски-пасса" subtitle={data.skiPassId || "-"} />
          <CardInfo
            title="Назначенный тренер"
            subtitle={data.coachNameSurname || "-"}
          />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              dispatch(closeConfirmGuestPopup());
              dispatch(clearChosenGuest());
            }}
            type="button"
          />
        </>
      ) : null}
    </ModalComponent>
  );
};

export default ConfirmGuestPopup;
