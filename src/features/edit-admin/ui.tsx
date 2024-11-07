import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { closeAdminPopup } from "~features/popup/popupSlice";
import { editUser } from "~entities/user/userSlice";
// import { getPassword } from "~entities/user/userSlice";
import { AvatarItem } from "~shared/avatar-item";
import { FormBox } from "~shared/form-box";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  login: string;
  // password: string;
};

const schema = yup
  .object({
    login: yup.string().min(2).required(),
    // password: yup.string().min(2).required(),
  })
  .required();

export const EditAdmin: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user.userData);

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      login: user.login,
      // password: password,
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  const updateUser = (id: string, login: string) => {
    return dispatch(editUser({ id: id, login: login }))
      .then(() => {
        dispatch(closeAdminPopup());
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
    updateUser(user.id, data.login);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <AvatarItem />
        <TextInput name="login" label="Имя" />
        {/* <TextInput name="password" label="Пароль" /> */}
        <ModalButton
          btnText="Ок"
          disabled={!formState.isValid || !formState.isDirty || loading}
        />
      </FormBox>
    </FormProvider>
  );
};
