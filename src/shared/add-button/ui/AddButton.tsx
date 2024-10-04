import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { FC } from "react";
import styles from "./AddButton.module.css";

interface IAddButtonProps {
  btnText: string;
  handleClick?: () => void;
}

const AddButton: FC<IAddButtonProps> = ({ btnText, handleClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      className={styles.btn}
      onClick={handleClick}
    >
      {btnText}
    </Button>
  );
};

export default AddButton;
