import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Login } from "~features/login";
import { routes } from "~shared/lib/routes-names";

import fb from "./fb.svg";
import google from "./google.svg";
import image from "./image 199.svg";
import styles from "./Login.module.css";
import vk from "./vk.svg";

const currentYear = new Date().getFullYear();

const LoginPage: FC = () => {
  return (
    <Container component="div" maxWidth={false} className={styles.login}>
      <Box component="div" className={styles.container}>
        <Avatar
          variant="square"
          src={image}
          alt="skier mask"
          className={styles.image}
        />
        <Typography component="p" align="center" className={styles.text}>
          Личный кабинет
        </Typography>
        <Typography
          component="h1"
          align="center"
          className={`${styles.text} ${styles.title}`}
        >
          Горнолыжного курорта
        </Typography>
        <Login />
        <Box component="div" className={styles.icons}>
          <Link href="#" className={styles.link}>
            <img src={google} alt="google" />
          </Link>
          <Link href="#" className={styles.link}>
            <img src={fb} alt="fb" />
          </Link>
          <Link href="#" className={styles.link}>
            <img src={vk} alt="vk" />
          </Link>
        </Box>
        <Link
          href={routes.register}
          color="#1371FA"
          variant="body2"
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </Box>
      <Typography component="span" align="center" className={styles.copywrite}>
        &copy; {currentYear}. Все права защищены
      </Typography>
    </Container>
  );
};

export default LoginPage;
