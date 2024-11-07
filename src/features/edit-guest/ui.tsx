import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { FC, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import {
  closeEditGuestPopup,
  openConfirmGuestPopup,
} from "~features/popup/popupSlice";
import {
  addGuestToCoach,
  fetchAllCoaches,
  removeGuestFromCoach,
  updateGuestToCoach,
} from "~entities/coach/coachSlice";
import { editGuest, setChosenGuest, TGuest } from "~entities/guest/guestSlice";
import {
  addGuestToSkipass,
  fetchAllSkipasses,
  removeGuestFromSkipass,
  updateGuestToSkipass,
} from "~entities/skipass/skipassSlice";
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

export const EditGuest: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const guest = useAppSelector((state) => state.guests.chosenGuest) as TGuest;

  const prevCoach = useRef<string>();
  const prevSkipass = useRef<string>();

  useEffect(() => {
    prevCoach.current = guest.coachId;
    prevSkipass.current = guest.skiPassId;
  }, [guest.coachId, guest.skiPassId]);

  // temp
  const coaches = useAppSelector((state) => state.coaches.allCoaches);
  const skipasses = useAppSelector((state) => state.skipasses.allSkipasses);

  useEffect(() => {
    dispatch(fetchAllCoaches());
    dispatch(fetchAllSkipasses());
  }, []);

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: guest.name,
      surname: guest?.surname,
      birthDate: dayjs(guest.birthDate, "DD.MM.YYYY") as unknown as string,
      skipass: guest.skiPassId,
      coachId: guest.coachId,
    },
  });

  const { handleSubmit, formState } = methods;

  const renderCoach = (id: string) => {
    const coach = coaches.find((coach) => id === coach.id);

    return (
      coach && (
        <MenuItem key={coach.id} value={coach.id}>
          <PersonInfo
            title={`${coach.name} ${coach.surname}`}
            subtitle={coach.category}
            img={coach.photo}
          />
        </MenuItem>
      )
    );
  };

  const renderSkipass = (id: string) => {
    const skipass = skipasses.find((skipass) => id === skipass.id);

    return (
      skipass && (
        <SkipasInfo
          duration={skipass.duration}
          cost={skipass.cost}
          isMenuOption
        />
      )
    );
  };

  const updateSkipass = (guestId: string, skipassId: string) => {
    if (skipassId !== prevSkipass.current) {
      return dispatch(
        removeGuestFromSkipass({
          guestId,
          skipassId: prevSkipass.current as string,
        }),
      )
        .then(() => {
          dispatch(addGuestToSkipass({ guestId, skipassId }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return dispatch(updateGuestToSkipass({ guestId, skipassId }));
    }
  };

  const updateCoach = (guestId: string, coachId: string) => {
    if (coachId !== prevCoach.current) {
      return dispatch(
        removeGuestFromCoach({
          guestId,
          coachId: prevCoach.current as string,
        }),
      )
        .then(() => {
          dispatch(addGuestToCoach({ guestId, coachId }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return dispatch(updateGuestToCoach({ guestId, coachId }));
    }
  };

  const updateGuest = (data: TFormData, birthDate: string) => {
    const newData = {
      name: data.name,
      surname: data.surname,
      birthDate: birthDate,
      coachId: data.coachId,
      skiPassId: data.skipass,
    };
    return dispatch(
      editGuest({
        guestId: guest.id as string,
        data: newData,
      }),
    )
      .unwrap()
      .then((guest) => {
        dispatch(closeEditGuestPopup());

        data.skipass && updateSkipass(guest.id as string, data.skipass);

        data.coachId && updateCoach(guest.id as string, data.coachId);

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
    const birthDate = dayjs(data.birthDate).format("DD.MM.YYYY");

    updateGuest(data, birthDate);
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
          render={renderSkipass}
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
          render={renderCoach}
        />
        <ModalButton
          btnText="Сохранить"
          disabled={!formState.isValid || loading || !formState.isDirty}
        />
      </FormBox>
    </FormProvider>
  );
};
