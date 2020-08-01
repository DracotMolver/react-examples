import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// styles
import './utils/styles/unsemantic-grid-responsive.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
