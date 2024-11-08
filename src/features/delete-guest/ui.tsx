import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteGuestPopup } from "~features/popup/popupSlice";
import { removeGuestFromCoach } from "~entities/coach/coachSlice";
import { clearChosenGuest, deleteGuest } from "~entities/guest/guestSlice";
import { removeGuestFromSkipass } from "~entities/skipass/skipassSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

export const DeleteGuest: FC = () => {
  const guest = useAppSelector((state) => state.guests.chosenGuest);

  const dispatch = useAppDispatch();

  const onDeleteClick = (guestId: string) => {
    if (guest && guest.coachId) {
      dispatch(removeGuestFromCoach({ guestId, coachId: guest.coachId }));
    }

    if (guest && guest.skiPassId) {
      dispatch(removeGuestFromSkipass({ guestId, skipassId: guest.skiPassId }));
    }

    dispatch(deleteGuest(guestId));
  };

  return (
    <>
      {guest ? (
        <>
          <PersonCard
            name={`${guest.name} ${guest?.surname}`}
            sport={
              guest.coachNameSurname
                ? `Тренер: ${guest.coachNameSurname}`
                : "Гость"
            }
          />
          <DeleteText item="посетителя" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              guest.id && onDeleteClick(guest.id);
              dispatch(closeDeleteGuestPopup());
              dispatch(clearChosenGuest());
            }}
            type="button"
          />
        </>
      ) : null}
    </>
  );
};
