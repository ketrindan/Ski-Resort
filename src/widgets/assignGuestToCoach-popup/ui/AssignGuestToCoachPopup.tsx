import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AssignGuestToCoach } from "~features/assign-guest-to-coach";
import { closeAssignGuestToCoachPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AssignGuestToCoachPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isAssignGuestToCoachPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Назначить посетителя"
      open={popupOpen}
      handleClose={() => dispatch(closeAssignGuestToCoachPopup())}
    >
      <AssignGuestToCoach />
    </ModalComponent>
  );
};

export default AssignGuestToCoachPopup;
