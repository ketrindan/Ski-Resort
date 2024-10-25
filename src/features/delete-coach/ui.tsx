import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteCoachPopup } from "~features/popup/popupSlice";
import { clearChosenCoach, deleteCoach } from "~entities/coach/coachSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { PersonCard } from "~shared/person-card";

export const DeleteCoach: FC = () => {
  const data = useAppSelector((state) => state.coaches.chosenCoach);

  const dispatch = useAppDispatch();

  return (
    <>
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
    </>
  );
};
