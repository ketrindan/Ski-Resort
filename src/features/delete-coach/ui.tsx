import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteCoachPopup } from "~features/popup/popupSlice";
import { clearChosenCoach, deleteCoach } from "~entities/coach/coachSlice";
import { removeCoachFromGuest, TGuest } from "~entities/guest/guestSlice";
import { updateGuestToSkipass } from "~entities/skipass/skipassSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

export const DeleteCoach: FC = () => {
  const coach = useAppSelector((state) => state.coaches.chosenCoach);

  const dispatch = useAppDispatch();

  const updateGuest = (guest: TGuest) => {
    dispatch(removeCoachFromGuest({ guestId: guest.id }));
    guest.skiPassId &&
      dispatch(
        updateGuestToSkipass({ guestId: guest.id, skipassId: guest.skiPassId }),
      );
  };

  const onDeleteClick = (coachId: string) => {
    if (coach && coach.guests.length > 0) {
      coach.guests.forEach((guest) => {
        return updateGuest(guest);
      });
    }

    dispatch(deleteCoach(coachId));
  };

  return (
    <>
      {coach ? (
        <>
          <PersonCard
            name={`${coach.name} ${coach.surname}`}
            sport={coach.category}
          />
          <DeleteText item="инструктора" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              coach.id && onDeleteClick(coach.id);
              dispatch(closeDeleteCoachPopup());
              dispatch(clearChosenCoach());
            }}
            type="button"
          />
        </>
      ) : null}
    </>
  );
};
