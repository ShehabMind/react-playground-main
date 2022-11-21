import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TtContext } from "./context/TimeTrackingContext";
ReactDOM.render(
  <React.StrictMode>
    <TtContext>
      <App />
    </TtContext>
  </React.StrictMode>,
  document.getElementById("root")
);
