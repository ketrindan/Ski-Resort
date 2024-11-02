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
import { addGuestToCoach } from "~entities/coach/coachSlice";
import { addNewGuest, setChosenGuest } from "~entities/guest/guestSlice";
import { AvatarItem } from "~shared/avatar-item";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { SkipasInfo } from "~shared/skipass-info";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  surname: string;
  birthDate: string;
  skipass: string;
  coachId?: string;
};

const schema = yup
  .object({
    name: yup.string().min(2, "Минимальная длина 2 символа").required(),
    surname: yup.string().min(2, "Минимальная длина 2 символа").required(),
    birthDate: yup.string().required("Обязательное поле"),
    skipass: yup.string().required("Обязательное поле"),
    coachId: yup.string(),
  })
  .required();

export const AddGuest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // temp
  const coaches = useAppSelector((state) => state.coaches.coachesData);
  const skipasses = useAppSelector((state) => state.skipasses.skipassData);

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
        skiPassId: data.skipass,
      }),
    )
      .unwrap()
      .then((guest) => {
        dispatch(closeAddGuestPopup());
        data.coachId &&
          dispatch(
            addGuestToCoach({ guestId: guest.id, coachId: data.coachId }),
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
    const visitDate = dayjs(new Date()).format("DD.MM.YYYY");
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");

    createGuest(data, birthDate, visitDate);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="name" label="Имя" />
        <TextInput name="surname" label="Фамилия" />
        <DateInput name="birthDate" label="Дата рождения" />
        <SelectInput
          name="skipass"
          label="Номер ски-пасса"
          options={skipasses.map((skipass) => (
            <MenuItem key={skipass.id} value={skipass.id}>
              <SkipasInfo
                duration={skipass.duration}
                cost={skipass.cost}
                isMenuOption
              />
            </MenuItem>
          ))}
        />
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
