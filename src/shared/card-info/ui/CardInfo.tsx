import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./CardInfo.module.css";

interface ICardInfo {
  title: string;
  subtitle: string | number;
}

const CardInfo: FC<ICardInfo> = ({ title, subtitle }) => {
  return (
    <Box className={styles.info}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.subtitle}>{subtitle}</Typography>
    </Box>
  );
};

export default CardInfo;
