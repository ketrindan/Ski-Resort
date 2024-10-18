import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAddCoachPopup,
  openConfirmCoachPopup,
} from "~features/popup/popupSlice";
import { addNewCoach, setChosenCoach } from "~entities/coach/coachSlice";
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
  guestId?: number;
  sport: string;
};

const schema = yup
  .object({
    photo: yup.string(),
    name: yup.string().min(2).required(),
    surname: yup.string().min(2).required(),
    birthDate: yup.date().required(),
    gender: yup.string(),
    guestId: yup.number().positive().integer(),
    sport: yup.string().required(),
  })
  .required();

export const AddCoach: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // temp
  const guests = useAppSelector((state) => state.guests.guestsData);

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  function onSubmit(data: TFormData) {
    dispatch(closeAddCoachPopup());
    setLoading(true);
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");
    return dispatch(
      addNewCoach({
        name: data.name,
        surname: data.surname,
        birthDate: birthDate,
        sex: data.gender,
        category: data.sport,
      }),
    )
      .then((res) => {
        dispatch(closeAddCoachPopup());
        dispatch(setChosenCoach(res));
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