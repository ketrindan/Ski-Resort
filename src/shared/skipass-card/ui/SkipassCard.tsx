import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AvatarItem } from "~shared/avatar-item";
import styles from "./SkipassCard.module.css";

interface ISkipassCard {
  name: string;
  img?: string;
}

const SkipassCard: FC<ISkipassCard> = ({ name, img }) => {
  return (
    <Box className={styles.card}>
      <AvatarItem photo={img} variant="rounded" />
      <Typography className={styles.number}>{name}</Typography>
    </Box>
  );
};

export default SkipassCard;
