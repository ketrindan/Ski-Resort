import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeAddSkiPassPopup } from "~features/popup/popupSlice";
import { AvatarItem } from "~shared/avatar-item";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { convertAge } from "~shared/lib/convertAge";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  number: number;
  durationStart: Date;
  durationEnd: Date;
  cost: number;
  guestId?: number;
};

const schema = yup
  .object({
    number: yup.number().positive().integer().required(),
    durationStart: yup.date().required(),
    durationEnd: yup.date().required(),
    cost: yup.number().positive().integer().required(),
    guestId: yup.number().positive().integer(),
  })
  .required();

export const AddSkiPass: FC = () => {
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
    dispatch(closeAddSkiPassPopup());
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem variant="rounded" />
        <TextInput name="number" label="Номер" />
        <DateInput
          name="durationStart"
          label="Начало действия"
          withTime={true}
        />
        <DateInput name="durationEnd" label="Конец действия" withTime={true} />
        <TextInput name="cost" label="Цена" />
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
        <ModalButton btnText="Добавить" disabled={!formState.isValid} />
      </FormBox>
    </FormProvider>
  );
};
