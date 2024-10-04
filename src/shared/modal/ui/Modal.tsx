import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import styles from "./Modal.module.css";

export interface IModalProps {
  title: string;
  headerButton?: React.ReactNode;
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const ModalComponent: FC<IModalProps> = ({
  title,
  children,
  headerButton,
  open,
  handleClose,
}) => {
  const renderButton = useMemo(() => {
    if (headerButton) {
      return headerButton;
    } else {
      return (
        <IconButton className={styles.icon} onClick={handleClose}>
          <CloseIcon className={styles.close} />
        </IconButton>
      );
    }
  }, [headerButton]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      disableScrollLock
    >
      <Fade in={open}>
        <Box className={styles.box}>
          <Box className={styles.header}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className={styles.title}
            >
              {title}
            </Typography>
            {renderButton}
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
