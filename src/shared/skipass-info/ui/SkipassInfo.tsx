import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./SkipassInfo.module.css";

interface IOptionItem {
  duration: string;
  cost: number;
  isMenuOption?: boolean;
}

const OptionItem: FC<IOptionItem> = ({ duration, cost, isMenuOption }) => {
  const setClass = () => {
    const name = duration.toLowerCase().split(" ")[0];
    let className: string;
    switch (name) {
      case "дневной":
        className = `${styles.box} ${styles.box_day}`;
        break;
      case "полуденный":
        className = `${styles.box} ${styles.box_noon}`;
        break;
      case "вечерний":
        className = `${styles.box} ${styles.box_evening}`;
        break;
      default:
        className = `${styles.box}`;
    }

    return className;
  };

  if (isMenuOption) {
    return (
      <Box className={setClass()}>
        <Typography className={`${styles.duration} ${styles.duration_menu}`}>
          {duration}
        </Typography>
        <Typography className={`${styles.cost} ${styles.cost_menu}`}>
          {cost}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.info}>
      <Typography className={styles.duration}>{duration}</Typography>
      <Typography className={styles.cost}>{cost} р</Typography>
    </Box>
  );
};

export default OptionItem;
