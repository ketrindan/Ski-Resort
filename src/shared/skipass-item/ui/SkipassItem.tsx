import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { useState, FC } from "react";
import { AnyAction } from "redux";
import { useAppSelector } from "~app/store/hooks";
import { CardMenu } from "~shared/menu";
import { CardMenuItem } from "~shared/menu/api";
import { SkipasInfo } from "~shared/skipass-info";
import styles from "./SkipassItem.module.css";
interface ISkipass {
  name: string;
  cost: number;
  duration: string;
  menuItems: CardMenuItem[];
  getData?: AnyAction;
}

const SkipassItem: FC<ISkipass> = ({
  name,
  cost,
  duration,
  menuItems,
  getData,
}) => {
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
    let className: string;
    switch (name.toLowerCase()) {
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
      <SkipasInfo name={name} duration={duration} cost={cost} />
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
        getData={getData}
      />
    </Box>
  );
};

export default SkipassItem;
