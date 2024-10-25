import Menu from "@mui/material/Menu";
import type { MenuProps } from "@mui/material/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { AnyAction } from "redux";
import { useAppDispatch } from "~app/store/hooks";
import { CardMenuItem } from "../api";
import styles from "./Menu.module.css";

interface IMenuProps extends MenuProps {
  menuItems: CardMenuItem[];
  getData?: AnyAction;
}

const CardMenu: FC<IMenuProps> = ({ menuItems, ...props }) => {
  const dispatch = useAppDispatch();

  return (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={styles.menu}
      disableScrollLock
      {...props}
    >
      {menuItems.map((menuItem) => (
        <MenuItem
          {...menuItem}
          key={menuItem.id}
          onClick={() => {
            props.getData && dispatch(props.getData);
            dispatch(menuItem.callback);
          }}
        >
          {menuItem.text}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CardMenu;
