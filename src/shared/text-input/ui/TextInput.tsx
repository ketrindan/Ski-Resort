import TextField from "@mui/material/TextField";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputError } from "~shared/input-error";
import styles from "./TextInput.module.css";

interface ITextInputProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const TextInput: FC<ITextInputProps> = ({ name, label, disabled }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TextField
            value={value}
            onChange={onChange}
            error={!!error}
            margin="none"
            required
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            variant="filled"
            size="small"
            InputProps={{ disableUnderline: true }}
            className={styles.input}
            disabled={disabled}
          />
          <InputError message={error?.message as string} />
        </>
      )}
    />
  );
};

export default TextInput;
