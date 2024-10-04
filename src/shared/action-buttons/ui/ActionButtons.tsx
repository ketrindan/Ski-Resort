import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FC } from "react";
import styles from "./ActionButtons.module.css";

interface IActionButtons {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ActionButtons: FC<IActionButtons> = ({ onEditClick, onDeleteClick }) => {
  return (
    <Box className={styles.btns_box}>
      <IconButton className={styles.icon} onClick={onEditClick}>
        <EditIcon className={styles.edit} />
      </IconButton>
      <IconButton className={styles.icon}>
        <DeleteIcon className={styles.delete} onClick={onDeleteClick} />
      </IconButton>
    </Box>
  );
};

export default ActionButtons;
