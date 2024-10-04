import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAddGuestPopup,
  openConfirmGuestPopup,
} from "~features/popup/popupSlice";
import {
  addCoachToGuest,
  addNewGuest,
  getGuest,
  setChosenGuest,
} from "~entities/guest/guestSlice";
import { AvatarItem } from "~shared/avatar-item";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  surname: string;
  birthDate: string;
  skipass?: number;
  coachId?: number;
};

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    surname: yup.string().min(2).required(),
    birthDate: yup.string().required(),
    skipass: yup.number().positive(),
    coachId: yup.number().positive(),
  })
  .required();

export const AddGuest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // temp
  const coaches = useAppSelector((state) => state.coaches.coachesData);

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  const createGuest = (
    data: TFormData,
    birthDate: string,
    visitDate: string,
  ) => {
    return dispatch(
      addNewGuest({
        name: data.name,
        surname: data.surname,
        birthDate: birthDate,
        visitDate: visitDate,
        coachId: data.coachId,
      }),
    )
      .unwrap()
      .then((guest) => {
        dispatch(closeAddGuestPopup());
        dispatch(setChosenGuest(guest));
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

  const createGuestWithCoach = (
    data: TFormData,
    birthDate: string,
    visitDate: string,
  ) => {
    return dispatch(
      addNewGuest({
        name: data.name,
        surname: data.surname,
        birthDate: birthDate,
        visitDate: visitDate,
        coachId: data.coachId,
      }),
    )
      .unwrap()
      .then((res) => {
        if (data.coachId) {
          return dispatch(
            addCoachToGuest({ guestId: res.id, coachId: data.coachId }),
          ).unwrap();
        }
      })
      .then((res) => {
        if (res) {
          const id = Number(res.data.split(" ").pop());
          return dispatch(getGuest(id)).unwrap();
        }
      })
      .then((guest) => {
        dispatch(closeAddGuestPopup());
        dispatch(setChosenGuest(guest));
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
    const visitDate = dayjs(new Date()).format("DD.MM.YYYY");
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");

    if (data.coachId) {
      createGuestWithCoach(data, birthDate, visitDate);
    } else {
      createGuest(data, birthDate, visitDate);
    }
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="name" label="Имя" />
        <TextInput name="surname" label="Фамилия" />
        <DateInput name="birthDate" label="Дата рождения" />
        <TextInput name="skipass" label="Номер ски-пасса" />
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
          btnText="Добавить"
          disabled={!formState.isValid || loading}
        />
      </FormBox>
    </FormProvider>
  );
};
