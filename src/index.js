import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./Components/UserContext";
import { BranchProvider } from "./Components/BranchContext";
import { CustomerProvider } from "./Components/CustomerContex";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
import App from "./App";
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BranchProvider>
      <UserProvider>
        <CustomerProvider>
          <App />
        </CustomerProvider>
      </UserProvider>
    </BranchProvider>
  </React.StrictMode>
);
