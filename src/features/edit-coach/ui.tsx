import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeEditCoachPopup,
  openConfirmCoachPopup,
} from "~features/popup/popupSlice";
import { editCoach, setChosenCoach, TCoach } from "~entities/coach/coachSlice";
import { editGuest } from "~entities/guest/guestSlice";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { ImageInput } from "~shared/image-input";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  photo?: string;
  name: string;
  surname: string;
  birthDate: string;
  gender?: string;
  sport: string;
};

const schema = yup
  .object({
    photo: yup.string(),
    name: yup.string().min(2, "Минимальная длина 2 символа").required(),
    surname: yup.string().min(2, "Минимальная длина 2 символа").required(),
    birthDate: yup.string().required(),
    gender: yup.string().matches(/(^м$|^ж$)/, `Возможные значения "м" и "ж"`),
    sport: yup.string().required(),
  })
  .required();

export const EditCoach: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const coach = useAppSelector((state) => state.coaches.chosenCoach) as TCoach;

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      // photo: coach.photo,
      name: coach.name,
      surname: coach?.surname,
      birthDate: dayjs(coach.birthDate, "DD.MM.YYYY") as unknown as string,
      gender: coach.sex,
      sport: coach.category,
    },
  });

  const { handleSubmit, formState } = methods;

  const updateGuests = () => {
    if (coach.guests.length > 0) {
      coach.guests.forEach((guest) => {
        return dispatch(
          editGuest({
            guestId: guest.id as string,
            data: {
              ...guest,
              coachNameSurname: `${coach?.name} ${coach?.surname}`,
              coachSex: coach.sex,
              coachCategory: coach.category,
            },
          }),
        );
      });
    }
  };

  const updateCoach = (data: TFormData, birthDate: string) => {
    const newData = {
      photo: data.photo,
      name: data.name,
      surname: data.surname,
      birthDate: birthDate,
      gender: data.gender,
      category: data.sport,
      guests: coach.guests,
    };
    return dispatch(
      editCoach({
        coachId: coach.id as string,
        data: newData,
      }),
    )
      .unwrap()
      .then((coach) => {
        dispatch(closeEditCoachPopup());
        updateGuests();
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

  function onSubmit(data: TFormData) {
    setLoading(true);
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");

    updateCoach(data, birthDate);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <ImageInput name="photo" />
        <TextInput name="name" label="Имя" />
        <TextInput name="surname" label="Фамилия" />
        <DateInput name="birthDate" label="Дата рождения" />
        <TextInput
          name="gender"
          label="Пол"
          disabled={formState.defaultValues?.gender !== undefined}
        />
        <TextInput name="sport" label="Вид спорта" />
        <ModalButton
          btnText="Сохранить"
          disabled={!formState.isValid || loading || !formState.isDirty}
        />
      </FormBox>
    </FormProvider>
  );
};
