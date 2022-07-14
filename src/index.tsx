import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { ContextProvider } from "./contexts/contextProvider";

ReactDOM.render(
  <StyledEngineProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);