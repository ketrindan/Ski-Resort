import { Typography } from "@mui/material";
import { FC } from "react";
import { Status } from "~shared/lib/status";
import styles from "./StatusWrapper.module.css";

export interface IStatusWrapperProps {
  status: keyof typeof Status;
  children: React.ReactNode;
}

const StatusWrapper: FC<IStatusWrapperProps> = ({ status, children }) => {
  return (
    <>
      {status === Status.loading && (
        <Typography className={styles.text}>Loading...</Typography>
      )}
      {status === Status.failed && (
        <Typography className={styles.text}>Error...</Typography>
      )}
      {status === Status.succeeded && children}
    </>
  );
};

export default StatusWrapper;
