import React from "react";
import ReactDOM from "react-dom/client";
import AppRoot from "./App.jsx";
import { App } from "antd";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App>
      <AppRoot />
    </App>
  </React.StrictMode>
);
