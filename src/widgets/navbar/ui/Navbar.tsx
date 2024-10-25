import People from "@mui/icons-material/People";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import List from "@mui/material/List";
import SvgIcon from "@mui/material/SvgIcon";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { toggleAdminMode } from "~entities/user/userSlice";
import { routes } from "~shared/lib/routes-names";
import styles from "./Navbar.module.css";

const navItems = [
  {
    link: routes.guests,
    icon: <People className={styles.icon} />,
    name: "Посетители",
  },
  {
    link: routes.coaches,
    icon: <RecordVoiceOverIcon className={styles.icon} />,
    name: "Инструкторы",
  },
  {
    link: routes.skipasses,
    icon: (
      <SvgIcon>
        <svg
          width="22"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6.11765H19V7.26471H12V6.11765ZM12 4.20588H19V5.35294H12V4.20588ZM12 8.02941H19V9.17647H12V8.02941ZM20 0H2C0.9 0 0 0.688235 0 1.52941V11.4706C0 12.3118 0.9 13 2 13H20C21.1 13 22 12.3118 22 11.4706V1.52941C22 0.688235 21.1 0 20 0ZM20 11.4706H11V1.52941H20V11.4706Z"
            fill="#C2C9CE"
          />
        </svg>
      </SvgIcon>
    ),
    name: "Ски-пассы",
  },
  // {
  //   link: "#",
  //   icon: <SettingsOutlinedIcon className={styles.icon} />,
  //   name: "Настройки",
  // },
];

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin =
    useAppSelector((state) => state.user.role) === "Администратор";

  const adminMode = useAppSelector((state) => state.user.isAdminMode);

  return (
    <Drawer variant="permanent" className={styles.navbar}>
      <List disablePadding className={styles.list}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link}`
            }
          >
            {item.icon}
            <Typography>{item.name}</Typography>
          </NavLink>
        ))}
      </List>
      <Box>
        {isAdmin && (
          <FormGroup>
            <FormControlLabel
              label="Режим администратора"
              className={styles.control}
              control={
                <Switch
                  className={styles.switch}
                  onChange={() => dispatch(toggleAdminMode())}
                  checked={adminMode}
                />
              }
            />
          </FormGroup>
        )}
        {/* {navItems.slice(-1).map((item) => (
          <NavItem
            key={item.name}
            link={item.link}
            icon={item.icon}
            name={item.name}
          />
        ))} */}
      </Box>
      <Typography component="span" className={styles.span}>
        Все права защищены
      </Typography>
    </Drawer>
  );
};

export default Navbar;
