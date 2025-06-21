import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // or App.tsx
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // or "./App.css" if that's your CSS file

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
