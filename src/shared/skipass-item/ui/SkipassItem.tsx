import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState, FC } from "react";
import { useAppSelector } from "~app/store/hooks";
import { CardMenu } from "~shared/menu";
import { CardMenuItem } from "~shared/menu/api";
import styles from "./SkipassItem.module.css";
interface ISkipass {
  cost: number;
  duration: string;
  menuItems: CardMenuItem[];
}

const SkipassItem: FC<ISkipass> = ({ cost, duration, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const isAdminMode = useAppSelector((state) => state.user.isAdminMode);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <Box className={setClass()}>
      <Box className={styles.info}>
        <Typography className={styles.duration}>{duration}</Typography>
        <Typography className={styles.cost}>{cost} р</Typography>
      </Box>
      {isAdminMode && (
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          className={styles.button}
        >
          <MoreIcon className={styles.icon} />
        </IconButton>
      )}
      <CardMenu
        anchorEl={anchorEl}
        menuItems={menuItems}
        onClose={handleMenuClose}
        open={isMenuOpen}
      />
    </Box>
  );
};

export default SkipassItem;
