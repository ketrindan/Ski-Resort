import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "~app/store/hooks";
import { TChangePageCallback } from "~shared/lib/types";
import styles from "./ListContainer.module.css";

export interface IContainerListProps {
  title: string;
  actionButton: React.ReactNode;
  children?: React.ReactNode;
  link?: string;
  main?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: TChangePageCallback;
}

const ListContainer: FC<IContainerListProps> = ({
  title,
  actionButton,
  children,
  link,
  main,
  page,
  totalPages,
  onPageChange,
}) => {
  const isAdminMode = useAppSelector((state) => state.user.isAdminMode);

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    "&::before": {
      display: "none",
    },
  }));

  if (main) {
    return (
      <Accordion className={styles.list_container}>
        <AccordionSummary
          className={(styles.list_header, styles.list_header_main)}
          expandIcon={<ExpandMoreIcon className={styles.less_icon} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography className={styles.title}> {title} </Typography>
          {isAdminMode && actionButton}
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.box}>{children} </Box>
          {link && (
            <Box className={styles.link_box}>
              <NavLink to={link} className={styles.link}>
                Все
                <ArrowForwardIcon className={styles.arrow_icon} />
              </NavLink>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box className={styles.list_container}>
      <Box className={styles.list_header}>
        <Typography className={styles.title}> {title} </Typography>
        {isAdminMode && actionButton}
        <Stack className={styles.stack}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            hidePrevButton={true}
            size="small"
            renderItem={(item) => (
              <PaginationItem
                slots={{ next: ArrowForwardIcon }}
                {...item}
                className={styles.pagination_item}
              />
            )}
          />
        </Stack>
      </Box>
      <Box className={styles.box}> {children} </Box>
    </Box>
  );
};

export default ListContainer;
