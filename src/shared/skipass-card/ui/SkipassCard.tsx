import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AvatarItem } from "~shared/avatar-item";
import styles from "./SkipassCard.module.css";

interface ISkipassCard {
  id: string;
  img?: string;
}

const PersonCard: FC<ISkipassCard> = ({ id, img }) => {
  return (
    <Box className={styles.card}>
      <AvatarItem photo={img} variant="rounded" />
      <Typography className={styles.number}>{id}</Typography>
    </Box>
  );
};

export default PersonCard;
