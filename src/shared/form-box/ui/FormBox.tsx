import Box from "@mui/material/Box";
import { FC } from "react";
import styles from "./FormBox.module.css";

interface IFormBoxProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const FormBox: FC<IFormBoxProps> = ({ onSubmit, children }) => {
  return (
    <Box
      component="form"
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </Box>
  );
};

export default FormBox;
