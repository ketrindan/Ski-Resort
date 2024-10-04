import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FC, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputError } from "~shared/input-error";
import styles from "./DateInput.module.css";

interface IDateInputProps {
  name: string;
  label: string;
  withTime?: boolean;
}

const DateInput: FC<IDateInputProps> = ({ name, label, withTime }) => {
  const { control } = useFormContext();

  const render = useMemo(() => {
    if (withTime) {
      return (
        <Controller
          name={name}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <DateTimePicker
                value={value}
                onChange={onChange}
                label={label}
                className={styles.input}
                disablePast
              />
              <InputError message={error?.message as string} />
            </>
          )}
        />
      );
    } else {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <DatePicker
                value={value}
                onChange={onChange}
                label={label}
                className={styles.input}
                disableFuture
              />
              <InputError message={error?.message as string} />
            </>
          )}
        />
      );
    }
  }, [withTime, label, name]);

  return <>{render}</>;
};

export default DateInput;
