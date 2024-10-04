import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./InputError.module.css";

interface IInputErrorProps {
  message: string;
}

const InputError: FC<IInputErrorProps> = ({ message }) => {
  const classNames = message
    ? `${styles.span} ${styles.span_active}`
    : `${styles.span}`;

  return (
    <Typography component="span" className={classNames}>
      {message}
    </Typography>
  );
};

export default InputError;
