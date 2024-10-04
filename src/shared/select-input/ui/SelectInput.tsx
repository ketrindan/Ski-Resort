import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputError } from "~shared/input-error";
import styles from "./SelectInput.module.css";

interface ISelectInputProps {
  name: string;
  label?: string;
  empty?: boolean;
  defaultValue?: string;
  options: React.ReactNode;
}

const SelectInput: FC<ISelectInputProps> = ({
  name,
  label,
  options,
  empty = false,
  defaultValue,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <FormControl fullWidth>
            <InputLabel id="select-label" className={styles.label}>
              {label}
            </InputLabel>
            <Select
              value={value}
              onChange={onChange}
              labelId="select-label"
              defaultValue={defaultValue}
              displayEmpty={empty}
              label={label}
              variant="filled"
              fullWidth
              className={styles.select}
            >
              {options}
            </Select>
          </FormControl>
          <InputError message={error?.message as string} />
        </>
      )}
    />
  );
};

export default SelectInput;
