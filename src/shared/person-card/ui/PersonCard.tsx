import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { AvatarItem } from "~shared/avatar-item";
import styles from "./PersonCard.module.css";

interface IPersonCard {
  name: string;
  sport: string;
  img?: string;
}

const PersonCard: FC<IPersonCard> = ({ name, sport, img }) => {
  return (
    <Box className={styles.card}>
      <AvatarItem photo={img} />
      <Typography className={styles.name}>{name}</Typography>
      <Typography className={styles.sport}>{sport}</Typography>
    </Box>
  );
};

export default PersonCard;
