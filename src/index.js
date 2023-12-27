import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { VersionProvider } from "./VersionProvider";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <VersionProvider>
      <App />
    </VersionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
