import { StyledEngineProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Suspense } from "react";
import { Routing } from "../pages";
import "dayjs/locale/ru";
import "./styles/index.css";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="app">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <Suspense>
            <Routing />
          </Suspense>
        </LocalizationProvider>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
