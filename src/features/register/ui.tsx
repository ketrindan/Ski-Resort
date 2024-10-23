import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { register } from "~entities/user/userSlice";
import { FormBox } from "~shared/form-box";
import { routes } from "~shared/lib/routes-names";
import { ModalButton } from "~shared/modal-button";
import { TextInput } from "~shared/text-input";

export type TFormData = {
  name: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    password: yup.string().min(6).max(10).required(),
    confirmPassword: yup
      .string()
      .min(6)
      .max(10)
      .required()
      .oneOf([yup.ref("password")], "Пароли не совпадают"),
    isAdmin: yup.boolean().required(),
  })
  .required();

export const Register: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const methods = useForm<TFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: TFormData) => {
    try {
      await dispatch(
        register({
          login: data.name,
          password: data.password,
          isAdmin: data.isAdmin,
        }),
      );
      !user.error && navigate(routes.login);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <TextInput name="name" label="Логин" />
        <TextInput name="password" label="Пароль" />
        <TextInput name="confirmPassword" label="Повторите пароль" />
        <FormControlLabel
          control={
            <Controller
              name="isAdmin"
              render={({ field }) => (
                <Checkbox value={field.value} onChange={field.onChange} />
              )}
            />
          }
          label="Администратор"
        />
        <ModalButton
          btnText="Зарегистрироваться"
          disabled={!formState.isValid}
        />
      </FormBox>
    </FormProvider>
  );
};
