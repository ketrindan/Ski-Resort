import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { FC } from "react";

import styles from "./Search.module.css";

const Search: FC = () => {
  return (
    <Box className={styles.search}>
      <SearchIcon className={styles.search_icon} />
      <InputBase
        className={styles.search_input}
        placeholder="Поиск"
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
};

export default Search;
