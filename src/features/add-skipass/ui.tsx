import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAddSkiPassPopup,
  openConfirmSkiPassPopup,
} from "~features/popup/popupSlice";
import { addSkipassToGuest, TGuest } from "~entities/guest/guestSlice";
import {
  addNewSkipass,
  setChosenSkipass,
} from "~entities/skipass/skipassSlice";
import { AvatarItem } from "~shared/avatar-item";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { convertAge } from "~shared/lib/convertAge";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  durationStart: Date;
  durationEnd: Date;
  cost: number;
  guestId?: string;
};

const schema = yup
  .object({
    durationStart: yup.date().required(),
    durationEnd: yup
      .date()
      .required()
      .min(
        yup.ref("durationStart"),
        "Конец срока действия не должен быть раньше начала действия",
      ),
    cost: yup.number().positive().integer().required(),
    guestId: yup.string(),
  })
  .required();

export const AddSkiPass: FC = () => {
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
    dispatch(closeAddSkiPassPopup());
    setLoading(true);
    const startDate = dayjs(data.durationStart).format("DD.MM.YYYY HH:mm");
    const endDate = dayjs(data.durationEnd).format("DD.MM.YYYY HH:mm");
    const guestList: TGuest[] = [];

    if (data.guestId !== undefined) {
      guestList.push(
        guests.find((guest) => guest.id === data.guestId) as TGuest,
      );
    }

    return dispatch(
      addNewSkipass({
        cost: data.cost,
        duration: `${startDate}-${endDate}`,
        agents: guestList,
      }),
    )
      .unwrap()
      .then((skipass) => {
        dispatch(closeAddSkiPassPopup());
        data.guestId &&
          dispatch(
            addSkipassToGuest({
              guestId: data.guestId,
              skiPassId: skipass.id as string,
            }),
          );
        skipass && dispatch(setChosenSkipass(skipass));
      })
      .then(() => {
        dispatch(openConfirmSkiPassPopup());
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
        <AvatarItem variant="rounded" />
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
        <ModalButton
          btnText="Добавить"
          disabled={!formState.isValid || loading}
        />
      </FormBox>
    </FormProvider>
  );
};
