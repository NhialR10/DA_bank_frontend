import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Forex from "./Components/Forex";
import Expenses from "./Components/Expense";
import MpessaMomo from "./Components/MpessaMomo";
import Capital from "./Components/Capital";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";
import LocalTransfer from "./Components/LocalTransfer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State to track which user is being edited
  const [editBranch, seteditBranch] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          setOpenSidebarToggle={setOpenSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forex" element={<Forex />} />
          <Route path="/capital_operations" element={<Capital />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/local-transfer" element={<LocalTransfer />} />
          <Route
            path="/settings"
            element={
              <Settings
                seteditBranch={seteditBranch}
                editBranch={editBranch}
                setEditingUser={setEditingUser}
                editingUser={editingUser}
              />
            }
          />
          <Route path="/momo_mpessa" element={<MpessaMomo />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
