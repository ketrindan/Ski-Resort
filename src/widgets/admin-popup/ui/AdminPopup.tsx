import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { EditAdmin } from "~features/edit-admin";
import { closeAdminPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AdminPopup: FC = () => {
  const adminPopupOpen = useAppSelector(
    (state) => state.popups.isAdminPopupOpen,
  );

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title="Личный кабинет администратора"
      open={adminPopupOpen}
      handleClose={() => dispatch(closeAdminPopup())}
    >
      <EditAdmin />
    </ModalComponent>
  );
};

export default AdminPopup;
