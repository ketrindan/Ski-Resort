import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "~app/store/hooks";
import { login } from "~entities/user/userSlice";
import { FormBox } from "~shared/form-box";
import { routes } from "~shared/lib/routes-names";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  login: string;
  password: string;
};

const schema = yup
  .object({
    login: yup.string().min(2, "Минимальная длина логина 2 символа").required(),
    password: yup
      .string()
      .min(6, "Минимальная длина пароля 6 символов")
      .max(10, "Максимальная длина пароля 10 символов")
      .required(),
  })
  .required();

export const Login: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  function onSubmit(data: TFormData) {
    dispatch(login(data));
    navigate(routes.main);
  }

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <TextInput name="login" label="Логин" />
        <TextInput name="password" label="Пароль" />
        <ModalButton btnText="Войти" disabled={!formState.isValid} />
      </FormBox>
    </FormProvider>
  );
};
