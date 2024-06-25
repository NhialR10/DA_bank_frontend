import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./Components/UserContext";
import { BranchProvider } from "./Components/BranchContext";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BranchProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </BranchProvider>
  </React.StrictMode>
);
