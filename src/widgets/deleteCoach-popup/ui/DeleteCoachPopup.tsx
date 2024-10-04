import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteCoachPopup } from "~features/popup/popupSlice";
import { clearChosenCoach, deleteCoach } from "~entities/coach/coachSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalComponent } from "~shared/modal";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

const DeleteCoachPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isDeleteCoachPopupOpen,
  );

  const data = useAppSelector((state) => state.coaches.chosenCoach);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Удаление инструктора"
      open={popupOpen}
      handleClose={() => dispatch(closeDeleteCoachPopup())}
    >
      {data ? (
        <>
          <PersonCard
            name={`${data.name} ${data.surname}`}
            sport={data.category}
          />
          <DeleteText item="инструктора" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              data.id && dispatch(deleteCoach(data.id));
              dispatch(closeDeleteCoachPopup());
              dispatch(clearChosenCoach());
            }}
            type="button"
          />
        </>
      ) : null}
    </ModalComponent>
  );
};

export default DeleteCoachPopup;
