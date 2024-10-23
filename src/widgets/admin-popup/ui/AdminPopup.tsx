import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { EditAdmin } from "~features/edit-admin";
import { closeAdminPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const AdminPopup: FC = () => {
  const adminPopupOpen = useAppSelector(
    (state) => state.popups.isAdminPopupOpen,
  );

  const isAdmin = useAppSelector((state) => state.user.userData.isAdmin);

  const dispatch = useAppDispatch();

  return (
    <ModalComponent
      title={isAdmin ? "Личный кабинет администратора" : "Личный кабинет"}
      open={adminPopupOpen}
      handleClose={() => dispatch(closeAdminPopup())}
    >
      <EditAdmin />
    </ModalComponent>
  );
};

export default AdminPopup;
