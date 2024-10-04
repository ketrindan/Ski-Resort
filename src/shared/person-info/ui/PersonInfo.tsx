import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./PersonInfo.module.css";

interface IOptionItem {
  title: string;
  subtitle: string;
  img?: string;
}

const OptionItem: FC<IOptionItem> = ({ title, subtitle, img }) => {
  return (
    <Box className={styles.box}>
      <Avatar className={styles.avatar} src={img} alt="avatar" />
      <Box className={styles.info}>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.subtitle}>{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default OptionItem;
