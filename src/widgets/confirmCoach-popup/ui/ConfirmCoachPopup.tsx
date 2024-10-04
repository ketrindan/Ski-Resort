import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeConfirmCoachPopup,
  openDeleteCoachPopup,
} from "~features/popup/popupSlice";
import { clearChosenCoach } from "~entities/coach/coachSlice";
import { ActionButtons } from "~shared/action-buttons";
import { CardInfo } from "~shared/card-info";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

const ConfirmCoachPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isConfirmCoachPopupOpen,
  );

  const data = useAppSelector((state) => state.coaches.chosenCoach);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Карточка инструктора"
      open={popupOpen}
      handleClose={() => {
        dispatch(closeConfirmCoachPopup());
        dispatch(clearChosenCoach());
      }}
      headerButton={
        <ActionButtons
          onEditClick={() => console.log("edit")}
          onDeleteClick={() => {
            dispatch(closeConfirmCoachPopup());
            dispatch(openDeleteCoachPopup());
          }}
        />
      }
    >
      {data ? (
        <>
          <PersonCard
            name={`${data.name} ${data.surname}`}
            sport={data.category}
          />
          <CardInfo title="Дата рождения" subtitle={data.birthDate} />
          <CardInfo title="Пол" subtitle={data.sex || "-"} />
          <CardInfo
            title="Назначенный посетитель"
            subtitle={
              data.guests
                ? `${data.guests[-1].name} ${data.guests[-1].surname}`
                : "-"
            }
          />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              dispatch(closeConfirmCoachPopup());
              dispatch(clearChosenCoach());
            }}
            type="button"
          />
        </>
      ) : null}
    </ModalComponent>
  );
};

export default ConfirmCoachPopup;
