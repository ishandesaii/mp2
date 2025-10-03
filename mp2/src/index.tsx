import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "normalize.css";
import "./index.css";
import { SelectionProvider } from "./context/SelectionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/mp2">
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

