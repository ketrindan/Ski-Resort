import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AssignCoachToGuest } from "~features/assign-coach-to-guest";
import { closeAssignCoachToGuestPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AssignCoachToGuestPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isAssignCoachToGuestPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Назначить тренера"
      open={popupOpen}
      handleClose={() => dispatch(closeAssignCoachToGuestPopup())}
    >
      <AssignCoachToGuest />
    </ModalComponent>
  );
};

export default AssignCoachToGuestPopup;
