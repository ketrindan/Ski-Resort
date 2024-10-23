import { Typography } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeErrorPopup, openErrorPopup } from "~features/popup/popupSlice";
import { ModalComponent } from "~shared/modal";

const ErrorPopup: FC = () => {
  const errorPopupOpen = useAppSelector(
    (state) => state.popups.isErrorPopupOpen,
  );

  const userError = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();

  const prevErrorRef = useRef<string | null>();

  useEffect(() => {
    prevErrorRef.current = userError;
  });

  const prevError = prevErrorRef.current;

  if (userError && userError !== prevError) {
    dispatch(openErrorPopup());
  }

  return (
    <ModalComponent
      title="Ошибка"
      open={errorPopupOpen}
      handleClose={() => {
        dispatch(closeErrorPopup());
      }}
    >
      <Typography color="error">{userError}</Typography>
    </ModalComponent>
  );
};

export default ErrorPopup;
