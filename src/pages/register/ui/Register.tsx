import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FC } from "react";
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
        <Link
          href={routes.login}
          color="#1371FA"
          variant="body2"
          className={styles.link}
        >
          Войти
        </Link>
      </Box>
      <Typography component="span" align="center" className={styles.copywrite}>
        &copy; {currentYear}. Все права защищены
      </Typography>
    </Container>
  );
};

export default LoginPage;
