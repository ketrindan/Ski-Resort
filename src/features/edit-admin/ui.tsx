import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "~app/store/hooks";
import { closeAdminPopup } from "~features/popup/popupSlice";
import { AvatarItem } from "~shared/avatar-item";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { SelectInput } from "~shared/select-input";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  surname: string;
  role: string;
};

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    surname: yup.string().min(2).required(),
    role: yup.string().required(),
  })
  .required();

export const EditAdmin: FC = () => {
  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      role: "ADMIN",
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  function onSubmit(data: TFormData) {
    dispatch(closeAdminPopup());
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="name" label="Имя" />
        <TextInput name="surname" label="Фамилия" />
        <SelectInput
          name="role"
          defaultValue="ADMIN"
          empty={true}
          options={<MenuItem value="ADMIN">Aдминистратор</MenuItem>}
        />
        <ModalButton btnText="Ок" disabled={!formState.isValid} />
      </FormBox>
    </FormProvider>
  );
};
