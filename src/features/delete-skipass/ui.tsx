import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteSkiPassPopup } from "~features/popup/popupSlice";
import { updateGuestToCoach } from "~entities/coach/coachSlice";
import { removeSkipassFromGuest, TGuest } from "~entities/guest/guestSlice";
import {
  clearChosenSkipass,
  deleteSkipass,
} from "~entities/skipass/skipassSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { SkipassCard } from "~shared/skipass-card";

export const DeleteSkipass: FC = () => {
  const skipass = useAppSelector((state) => state.skipasses.chosenSkipass);

  const dispatch = useAppDispatch();

  const updateGuest = (guest: TGuest) => {
    dispatch(removeSkipassFromGuest({ guestId: guest.id }));
    guest.coachId &&
      dispatch(
        updateGuestToCoach({ guestId: guest.id, coachId: guest.coachId }),
      );
  };

  const onDeleteClick = (id: string) => {
    if (skipass && skipass.agents.length > 0) {
      skipass.agents.forEach((guest) => {
        return updateGuest(guest);
      });
    }

    dispatch(deleteSkipass(id));
  };

  return (
    <>
      {skipass ? (
        <>
          <SkipassCard name={skipass.name ?? ""} />
          <DeleteText item="ски-пасса" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              skipass.id && onDeleteClick(skipass.id);
              dispatch(closeDeleteSkiPassPopup());
              dispatch(clearChosenSkipass());
            }}
            type="button"
          />
        </>
      ) : null}
    </>
  );
};
