import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
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

  return (
    <Box className={styles.list_container}>
      <Box className={styles.list_header}>
        <Typography className={styles.title}> {title} </Typography>
        {isAdminMode && actionButton}
        {main && <ExpandLessIcon className={styles.less_icon} />}
        {!main && (
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
        )}
      </Box>
      <Box className={styles.box}> {children} </Box>
      {main && (
        <Link
          href={link}
          variant="body2"
          underline="none"
          className={styles.link}
        >
          Все
          <ArrowForwardIcon className={styles.arrow_icon} />
        </Link>
      )}
    </Box>
  );
};

export default ListContainer;
