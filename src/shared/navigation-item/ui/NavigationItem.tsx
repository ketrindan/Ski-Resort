import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC, ReactNode } from "react";
import { useMatch } from "react-router-dom";
import styles from "./NavigationItem.module.css";

interface INavItem {
  link: string;
  icon: ReactNode;
  name: string;
}

const NavItem: FC<INavItem> = ({ link, icon, name }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        className={styles.button}
        href={link}
        selected={useMatch(link) ? true : false}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} className={styles.text} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
