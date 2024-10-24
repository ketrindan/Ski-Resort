import LogoutIcon from "@mui/icons-material/Logout";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~app/store/hooks";
import { openAdminPopup } from "~features/popup/popupSlice";
import { logOut } from "~entities/user/userSlice";
// import { Search } from "~shared/search";

import avatar from "./avatar.jpg";
import styles from "./Header.module.css";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  return (
    <AppBar className={styles.header}>
      <Toolbar className={styles.container}>
        <Box className={styles.infoBox}>
          <NavLink end to="/" className={styles.burger_box}>
            <Typography className={styles.title}>Горнолыжный курорт</Typography>
          </NavLink>
          <Box className={styles.userInfo}>
            <Box className={styles.avatar}>
              <Avatar src={avatar} alt="avatar" className={styles.img} />
              <IconButton
                className={styles.edit}
                onClick={() => dispatch(openAdminPopup())}
              >
                <ModeEditIcon className={styles.edit_icon} />
              </IconButton>
            </Box>
            <Typography className={styles.name}>
              {userData.userData.login}
            </Typography>
            <Typography className={styles.role}> {userData.role} </Typography>
          </Box>
        </Box>
        {/* <Search /> */}
        <IconButton className={styles.logout}>
          <LogoutIcon />
          <Typography onClick={() => dispatch(logOut())}> Выход </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
