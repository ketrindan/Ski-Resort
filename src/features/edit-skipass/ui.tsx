import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeEditSkiPassPopup,
  openConfirmSkiPassPopup,
} from "~features/popup/popupSlice";
import { updateGuestToCoach } from "~entities/coach/coachSlice";
import { editGuest, TGuest } from "~entities/guest/guestSlice";
import { Skipass } from "~entities/skipass";
import { editSkipass, setChosenSkipass } from "~entities/skipass/skipassSlice";
import { AvatarItem } from "~shared/avatar-item";
import { DateInput } from "~shared/date-input";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  durationStart: Date;
  durationEnd: Date;
  cost: number;
};

const schema = yup
  .object({
    name: yup.string().required(),
    durationStart: yup.date().required(),
    durationEnd: yup
      .date()
      .required()
      .min(
        yup.ref("durationStart"),
        "Конец срока действия не должен быть раньше начала действия",
      ),
    cost: yup.number().positive().integer().required(),
  })
  .required();

export const EditSkiPass: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const skipass = useAppSelector(
    (state) => state.skipasses.chosenSkipass,
  ) as Skipass;

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: skipass.name,
      durationStart: dayjs(
        skipass.duration.split(" - ")[0],
        "DD.MM.YYYY HH:mm",
      ) as unknown as Date,
      durationEnd: dayjs(
        skipass.duration.split(" - ")[1],
        "DD.MM.YYYY HH:mm",
      ) as unknown as Date,
      cost: skipass.cost,
    },
  });

  const { handleSubmit, formState } = methods;

  const updateGuest = (guest: TGuest, startDate: string, endDate: string) => {
    return dispatch(
      editGuest({
        guestId: guest.id as string,
        data: {
          ...guest,
          skiPassCost: skipass.cost,
          skiPassDuration: `${startDate}-${endDate}`,
        },
      }),
    )
      .unwrap()
      .then((guest) => {
        guest.coachId &&
          dispatch(
            updateGuestToCoach({
              guestId: guest.id,
              coachId: guest.coachId,
            }),
          );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateGuests = (startDate: string, endDate: string) => {
    if (skipass.agents.length > 0) {
      skipass.agents.forEach((guest) => {
        return updateGuest(guest, startDate, endDate);
      });
    }
  };

  const updateSkipass = (
    data: TFormData,
    startDate: string,
    endDate: string,
  ) => {
    const newData = {
      name: data.name,
      cost: data.cost,
      duration: `${startDate}-${endDate}`,
      agents: skipass.agents,
    };
    return dispatch(
      editSkipass({
        id: skipass.id as string,
        data: newData,
      }),
    )
      .unwrap()
      .then((skipass) => {
        dispatch(closeEditSkiPassPopup());
        updateGuests(startDate, endDate);
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
  };

  function onSubmit(data: TFormData) {
    setLoading(true);
    const startDate = dayjs(data.durationStart).format("DD.MM.YYYY HH:mm");
    const endDate = dayjs(data.durationEnd).format("DD.MM.YYYY HH:mm");

    updateSkipass(data, startDate, endDate);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem variant="rounded" />
        <TextInput name="name" label="Название" />
        <DateInput
          name="durationStart"
          label="Начало действия"
          withTime={true}
        />
        <DateInput name="durationEnd" label="Конец действия" withTime={true} />
        <TextInput name="cost" label="Цена" />
        <ModalButton
          btnText="Сохранить"
          disabled={!formState.isValid || loading || !formState.isDirty}
        />
      </FormBox>
    </FormProvider>
  );
};
