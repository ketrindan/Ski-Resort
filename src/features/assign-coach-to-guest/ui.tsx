import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAssignCoachToGuestPopup,
  openConfirmGuestPopup,
} from "~features/popup/popupSlice";
import { addGuestToCoach, fetchAllCoaches } from "~entities/coach/coachSlice";
import {
  addCoachToGuest,
  setChosenGuest,
  TGuest,
} from "~entities/guest/guestSlice";
import { updateGuestToSkipass } from "~entities/skipass/skipassSlice";
import { AvatarItem } from "~shared/avatar-item";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  surname: string;
  coachId: string;
};

const schema = yup
  .object({
    name: yup.string().min(2, "Минимальная длина 2 символа").required(),
    surname: yup.string().min(2, "Минимальная длина 2 символа").required(),
    coachId: yup.string().required(),
  })
  .required();

export const AssignCoachToGuest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const guest = useAppSelector((state) => state.guests.chosenGuest) as TGuest;

  // temp
  const coaches = useAppSelector((state) => state.coaches.allCoaches);

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: guest.name,
      surname: guest?.surname,
    },
  });

  const { handleSubmit, formState } = methods;

  useEffect(() => {
    dispatch(fetchAllCoaches());
  }, []);

  const assignCoach = (data: TFormData) => {
    return dispatch(
      addCoachToGuest({
        coachId: data.coachId,
        guestId: guest.id,
      }),
    )
      .unwrap()
      .then((guest) => {
        dispatch(closeAssignCoachToGuestPopup());
        dispatch(addGuestToCoach({ guestId: guest.id, coachId: data.coachId }));
        guest.skiPassId &&
          dispatch(
            updateGuestToSkipass({
              guestId: guest.id,
              skipassId: guest.skiPassId,
            }),
          );
        guest && dispatch(setChosenGuest(guest));
      })
      .then(() => {
        dispatch(openConfirmGuestPopup());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function onSubmit(data: TFormData) {
    setLoading(true);
    assignCoach(data);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="name" label="Имя" disabled />
        <TextInput name="surname" label="Фамилия" disabled />
        <SelectInput
          name="coachId"
          label="Назначить тренера"
          options={coaches.map((person) => (
            <MenuItem key={person.id} value={person.id}>
              <PersonInfo
                title={`${person.name} ${person.surname}`}
                subtitle={person.category}
                img={person.photo}
              />
            </MenuItem>
          ))}
        />
        <ModalButton
          btnText="Сохранить"
          disabled={!formState.isValid || loading}
        />
      </FormBox>
    </FormProvider>
  );
};
