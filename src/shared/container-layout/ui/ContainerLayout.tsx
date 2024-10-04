import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import styles from "./ContainerLayout.module.css";

const ContainerLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box className={styles.box}> {children} </Box>
);

export default ContainerLayout;
