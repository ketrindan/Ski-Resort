import Button from "@mui/material/Button";
import { FC } from "react";
import styles from "./ModalButton.module.css";

interface IModalButtonProps {
  btnText: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
}

const ModalButton: FC<IModalButtonProps> = ({
  btnText,
  disabled,
  onClick,
  type = "submit",
}) => {
  return (
    <Button
      type={type}
      variant="outlined"
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

export default ModalButton;
