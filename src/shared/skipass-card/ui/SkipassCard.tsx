import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AvatarItem } from "~shared/avatar-item";
import styles from "./SkipassCard.module.css";

interface ISkipassCard {
  number: number;
  img?: string;
}

const PersonCard: FC<ISkipassCard> = ({ number, img }) => {
  return (
    <Box className={styles.card}>
      <AvatarItem photo={img} variant="rounded" />
      <Typography className={styles.number}>{number}</Typography>
    </Box>
  );
};

export default PersonCard;
