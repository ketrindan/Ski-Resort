import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAddCoachPopup,
  openConfirmCoachPopup,
} from "~features/popup/popupSlice";
import {
  addNewCoach,
  setChosenCoach,
  TCoach,
  updateGuestToCoach,
} from "~entities/coach/coachSlice";
import {
  addCoachToGuest,
  fetchAllGuests,
  TGuest,
} from "~entities/guest/guestSlice";
import { updateGuestToSkipass } from "~entities/skipass/skipassSlice";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { ImageInput } from "~shared/image-input";
import { convertAge } from "~shared/lib/convertAge";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  photo?: string;
  name: string;
  surname: string;
  birthDate: Date;
  gender?: string;
  guestId?: string;
  sport: string;
};

const schema = yup
  .object({
    photo: yup.string(),
    name: yup.string().min(2, "Минимальная длина 2 символа").required(),
    surname: yup.string().min(2, "Минимальная длина 2 символа").required(),
    birthDate: yup.date().required(),
    gender: yup.string().matches(/(^м$|^ж$)/, `Возможные значения "м" и "ж"`),
    guestId: yup.string(),
    sport: yup.string().required(),
  })
  .required();

export const AddCoach: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // temp
  const guests = useAppSelector((state) => state.guests.allGuests);

  useEffect(() => {
    dispatch(fetchAllGuests());
  }, []);

  const updateGuest = (data: TFormData, coach: TCoach) => {
    if (data.guestId) {
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
      coach.guests[0].skiPassId &&
        dispatch(
          updateGuestToSkipass({
            guestId: data.guestId,
            skipassId: coach.guests[0].skiPassId,
          }),
        );
    }
  };

  const createCoach = (data: TFormData, birthDate: string) => {
    const guestList: TGuest[] = [];

    if (data.guestId !== undefined) {
      guestList.push(
        guests.find((guest) => guest.id === data.guestId) as TGuest,
      );
    }

    return dispatch(
      addNewCoach({
        name: data.name,
        surname: data.surname,
        birthDate: birthDate,
        sex: data.gender,
        category: data.sport,
        guests: guestList,
      }),
    )
      .unwrap()
      .then((coach) => {
        dispatch(closeAddCoachPopup());
        updateGuest(data, coach);
        coach && dispatch(setChosenCoach(coach));
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

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  function onSubmit(data: TFormData) {
    setLoading(true);
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");
    createCoach(data, birthDate);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <ImageInput name="photo" />
        <TextInput name="name" label="Имя" />
        <TextInput name="surname" label="Фамилия" />
        <DateInput name="birthDate" label="Дата рождения" />
        <TextInput name="gender" label="Пол" />
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
        <TextInput name="sport" label="Вид спорта" />
        <ModalButton
          btnText="Добавить"
          disabled={!formState.isValid || loading}
        />
      </FormBox>
    </FormProvider>
  );
};
