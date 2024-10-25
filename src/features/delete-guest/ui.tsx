import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteGuestPopup } from "~features/popup/popupSlice";
import { clearChosenGuest, deleteGuest } from "~entities/guest/guestSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

export const DeleteGuest: FC = () => {
  const data = useAppSelector((state) => state.guests.chosenGuest);

  const dispatch = useAppDispatch();

  return (
    <>
      {data ? (
        <>
          <PersonCard
            name={`${data.name} ${data?.surname}`}
            sport={data.coachCategory || "Гость"}
          />
          <DeleteText item="посетителя" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              data.id && dispatch(deleteGuest(data.id));
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
