import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "~app/store/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("~shared/mocks/browser");

  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

enableMocking().then(() => {
  root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
