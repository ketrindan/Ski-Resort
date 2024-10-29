import { FC } from "react";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeDeleteSkipassPopup } from "~features/popup/popupSlice";
import {
  clearChosenSkipass,
  deleteSkipass,
} from "~entities/skipass/skipassSlice";
import { DeleteText } from "~shared/delete-text";
import { ModalButton } from "~shared/modal-button";
import { SkipassCard } from "~shared/skipass-card";

export const DeleteSkipass: FC = () => {
  const data = useAppSelector((state) => state.skipasses.chosenSkipass);

  const dispatch = useAppDispatch();

  return (
    <>
      {data ? (
        <>
          <SkipassCard id={data.id} />
          <DeleteText item="ски-пасса" />
          <ModalButton
            btnText="Ок"
            onClick={() => {
              data.id && dispatch(deleteSkipass(data.id));
              dispatch(closeDeleteSkipassPopup());
              dispatch(clearChosenSkipass());
            }}
            type="button"
          />
        </>
      ) : null}
    </>
  );
};
