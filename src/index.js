import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./components/App/App";

// import theme
import theme from "./components/Theme/Theme";
import { ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
