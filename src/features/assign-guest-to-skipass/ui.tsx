import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeAssignGuestToSkiPassPopup,
  openConfirmSkiPassPopup,
} from "~features/popup/popupSlice";
import { updateGuestToCoach } from "~entities/coach/coachSlice";
import { addSkipassToGuest, fetchAllGuests } from "~entities/guest/guestSlice";
import { Skipass } from "~entities/skipass";
import {
  addGuestToSkipass,
  setChosenSkipass,
  updateGuestToSkipass,
} from "~entities/skipass/skipassSlice";
import { AvatarItem } from "~shared/avatar-item";
import { FormBox } from "~shared/form-box";
import { convertAge } from "~shared/lib/convertAge";
import { ModalButton } from "~shared/modal-button";
import { PersonInfo } from "~shared/person-info";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  guestId: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    guestId: yup.string().required(),
  })
  .required();

export const AssignGuestToSkiPass: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const skipass = useAppSelector(
    (state) => state.skipasses.chosenSkipass,
  ) as Skipass;

  const dispatch = useAppDispatch();

  // temp
  const guests = useAppSelector((state) => state.guests.allGuests);

  useEffect(() => {
    dispatch(fetchAllGuests());
  }, []);

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: skipass.name,
    },
  });

  const { handleSubmit, formState } = methods;

  const updateGuest = (data: TFormData, skipass: Skipass) => {
    if (data.guestId) {
      const guest = skipass.agents.find((guest) => guest.id === data.guestId);

      dispatch(
        addSkipassToGuest({
          guestId: data.guestId,
          skiPassId: skipass.id as string,
        }),
      );
      dispatch(
        updateGuestToSkipass({
          guestId: data.guestId,
          skipassId: skipass.id as string,
        }),
      );

      if (guest && guest.coachId) {
        dispatch(
          updateGuestToCoach({
            guestId: data.guestId,
            coachId: guest.coachId,
          }),
        );
      }
    }
  };

  const assignGuest = (data: TFormData) => {
    return dispatch(
      addGuestToSkipass({
        skipassId: skipass.id as string,
        guestId: data.guestId,
      }),
    )
      .unwrap()
      .then((skipass) => {
        dispatch(closeAssignGuestToSkiPassPopup());
        updateGuest(data, skipass);
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
    assignGuest(data);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem variant="rounded" />
        <TextInput name="name" label="Название" disabled />
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
