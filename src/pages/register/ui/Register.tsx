import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Register } from "~features/register";
import { routes } from "~shared/lib/routes-names";

import image from "./image 199.svg";
import styles from "./Register.module.css";

const currentYear = new Date().getFullYear();

const LoginPage: FC = () => {
  return (
    <Container component="div" maxWidth={false} className={styles.register}>
      <Box component="div" className={styles.container}>
        <Avatar
          variant="square"
          src={image}
          alt="skier mask"
          className={styles.image}
        />
        <Typography
          component="h1"
          align="center"
          className={`${styles.text} ${styles.title}`}
        >
          Регистрация
        </Typography>
        <Register />
        <NavLink to={routes.login} color="#1371FA" className={styles.link}>
          Войти
        </NavLink>
      </Box>
      <Typography component="span" align="center" className={styles.copywrite}>
        &copy; {currentYear}. Все права защищены
      </Typography>
    </Container>
  );
};

export default LoginPage;
