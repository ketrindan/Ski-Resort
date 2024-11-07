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
  const data = useAppSelector((state) => state.guests.chosenGuest);
  const guests = useAppSelector((state) => state.guests.guestsData);

  const dispatch = useAppDispatch();

  const onDeleteClick = (guestId: string) => {
    const guest = guests.find((guest) => guest.id === guestId);

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
      {data ? (
        <>
          <PersonCard
            name={`${data.name} ${data?.surname}`}
            sport={
              data.coachNameSurname
                ? `Тренер: ${data.coachNameSurname}`
                : "Гость"
            }
          />
          <DeleteText item="посетителя" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              data.id && onDeleteClick(data.id);
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
