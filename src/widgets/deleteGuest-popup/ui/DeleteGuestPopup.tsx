import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteGuestPopup } from "~features/popup/popupSlice";
import { clearChosenGuest, deleteGuest } from "~entities/guest/guestSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

const DeleteGuestPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteGuestPopupOpen,
  );

  const data = useAppSelector((state) => state.guests.chosenGuest);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление посетителя"
      open={popupOpen}
      handleClose={() => dispatch(closeDeleteGuestPopup())}
    >
      {data ? (
        <>
          <PersonCard
            name={`${data.name} ${data?.surname}`}
            sport={data.coachCategory || "-"}
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
    </ModalComponent>
  );
};

export default DeleteGuestPopup;
