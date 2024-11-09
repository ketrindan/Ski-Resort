import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAssignGuestToCoachPopup,
  openConfirmCoachPopup,
} from "~features/popup/popupSlice";
import {
  addGuestToCoach,
  setChosenCoach,
  TCoach,
  updateGuestToCoach,
} from "~entities/coach/coachSlice";
import { addCoachToGuest, fetchAllGuests } from "~entities/guest/guestSlice";
import { updateGuestToSkipass } from "~entities/skipass/skipassSlice";
import { AvatarItem } from "~shared/avatar-item";
import { FormBox } from "~shared/form-box";
import { convertAge } from "~shared/lib/convertAge";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  surname: string;
  guestId: string;
};

const schema = yup
  .object({
    name: yup.string().min(2, "Минимальная длина 2 символа").required(),
    surname: yup.string().min(2, "Минимальная длина 2 символа").required(),
    guestId: yup.string().required(),
  })
  .required();

export const AssignGuestToCoach: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const coach = useAppSelector((state) => state.coaches.chosenCoach) as TCoach;

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: coach.name,
      surname: coach.surname,
    },
  });

  const { handleSubmit, formState } = methods;

  // temp
  const guests = useAppSelector((state) => state.guests.allGuests);

  useEffect(() => {
    dispatch(fetchAllGuests());
  }, []);

  const updateGuest = (data: TFormData, coach: TCoach) => {
    if (data.guestId) {
      const guest = coach.guests.find((guest) => guest.id === data.guestId);

      dispatch(
        addCoachToGuest({
          guestId: data.guestId,
          coachId: coach.id as string,
        }),
      );
      dispatch(
        updateGuestToCoach({
          guestId: data.guestId,
          coachId: coach.id as string,
        }),
      );

      if (guest && guest.skiPassId) {
        dispatch(
          updateGuestToSkipass({
            guestId: data.guestId,
            skipassId: guest.skiPassId,
          }),
        );
      }
    }
  };

  const assignGuest = (data: TFormData) => {
    return dispatch(
      addGuestToCoach({
        coachId: coach.id as string,
        guestId: data.guestId,
      }),
    )
      .unwrap()
      .then((coach) => {
        dispatch(closeAssignGuestToCoachPopup());
        updateGuest(data, coach);
        coach && dispatch(setChosenCoach(coach));
        console.log(coach);
      })
      .then(() => {
        dispatch(openConfirmCoachPopup());
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
    assignGuest(data);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="name" label="Имя" disabled />
        <TextInput name="surname" label="Фамилия" disabled />
        <SelectInput
          name="guestId"
          label="Назначить посетителя"
          options={guests.map((person) => (
            <MenuItem key={person.id} value={person.id}>
              <PersonInfo
                title={`${person.name} ${person.surname}`}
                subtitle={convertAge(person.birthDate)}
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
