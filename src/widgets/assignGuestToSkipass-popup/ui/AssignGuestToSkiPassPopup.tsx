import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { AssignGuestToSkiPass } from "~features/assign-guest-to-skipass";
import { closeAssignGuestToSkiPassPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AssignGuestToSkiPassPopup: FC = () => {
  const popupOpen = useAppSelector(
    (state) => state.popups.isAssignGuestToSkipassPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Назначить посетителя"
      open={popupOpen}
      handleClose={() => dispatch(closeAssignGuestToSkiPassPopup())}
    >
      <AssignGuestToSkiPass />
    </ModalComponent>
  );
};

export default AssignGuestToSkiPassPopup;
