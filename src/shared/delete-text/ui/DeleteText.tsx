import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./DeleteText.module.css";

interface IDeleteText {
  item: string;
}

const DeleteText: FC<IDeleteText> = ({ item }) => {
  return (
    <Typography className={styles.text}>
      Вы уверены, что хотите удалить карточку этого {item}?
    </Typography>
  );
};

export default DeleteText;
