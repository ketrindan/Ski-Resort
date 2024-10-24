import MoreIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { FC, useState } from "react";
import { useAppSelector } from "~app/store/hooks";
import { CardMenu } from "~shared/menu";
import { CardMenuItem } from "~shared/menu/api";
import { PersonInfo } from "~shared/person-info";
import styles from "./PersonItem.module.css";

interface IPersonItem {
  title: string;
  subtitle: string;
  img?: string;
  menuItems: CardMenuItem[];
}

const PersonItem: FC<IPersonItem> = ({ title, subtitle, img, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const isAdminMode = useAppSelector((state) => state.user.isAdminMode);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.box}>
      <PersonInfo title={title} subtitle={subtitle} img={img} />
      {isAdminMode && (
        <IconButton
          id="action-button"
          size="large"
          aria-label="display more actions"
          edge="end"
          onClick={handleMenuOpen}
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

export default PersonItem;
