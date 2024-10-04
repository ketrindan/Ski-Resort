import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "~app/store/hooks";
import { logIn } from "~entities/user/userSlice";
import { FormBox } from "~shared/form-box";
import { routes } from "~shared/lib/routes-names";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    password: yup.string().min(6).max(10).required(),
  })
  .required();

export const Login: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  //temp
  const role = "Администратор";

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  function onSubmit(data: TFormData) {
    dispatch(logIn({ name: data.name, role }));
    navigate(routes.main);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <TextInput name="name" label="Логин" />
        <TextInput name="password" label="Пароль" />
        <ModalButton btnText="Войти" disabled={!formState.isValid} />
      </FormBox>
    </FormProvider>
  );
};
