import Container from "@mui/material/Container";
import { FC, PropsWithChildren } from "react";
import styles from "./PageLayout.module.css";

const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Container disableGutters maxWidth={false} className={styles.container}>
    {children}
  </Container>
);

export default PageLayout;
