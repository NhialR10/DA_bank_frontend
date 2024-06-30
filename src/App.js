import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Forex from "./Components/Forex";
import Expenses from "./Components/Expense";
import MpessaMomo from "./Components/MpessaMomo";
import Capital from "./Components/Capital";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";
import CreateAccount from "./Components/CreateAccount";
import LocalTransfer from "./Components/LocalTransfer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import { AuthProvider, AuthContext } from "./Components/AuthContext";

function PrivateRoute({ element: Element, ...rest }) {
  const { userLogin } = useContext(AuthContext);
  return userLogin ? <Element {...rest} /> : <Navigate to="/login" />;
}

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editBranch, seteditBranch] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ userLogin }) =>
            !userLogin ? (
              <Login />
            ) : (
              <div className="grid-container">
                <Header OpenSidebar={OpenSidebar} />
                <Sidebar
                  openSidebarToggle={openSidebarToggle}
                  setOpenSidebarToggle={setOpenSidebarToggle}
                  OpenSidebar={OpenSidebar}
                />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute element={Home} />} />
                  <Route
                    path="/forex"
                    element={<PrivateRoute element={Forex} />}
                  />
                  <Route
                    path="/capital_operations"
                    element={<PrivateRoute element={Capital} />}
                  />
                  <Route
                    path="/reports"
                    element={<PrivateRoute element={Reports} />}
                  />
                  <Route
                    path="/local-transfer"
                    element={<PrivateRoute element={LocalTransfer} />}
                  />
                  <Route
                    path="/create-account"
                    element={<PrivateRoute element={CreateAccount} />}
                  />
                  <Route
                    path="/settings"
                    element={
                      <PrivateRoute
                        element={Settings}
                        seteditBranch={seteditBranch}
                        editBranch={editBranch}
                        setEditingUser={setEditingUser}
                        editingUser={editingUser}
                      />
                    }
                  />
                  <Route
                    path="/momo_mpessa"
                    element={<PrivateRoute element={MpessaMomo} />}
                  />
                  <Route
                    path="/expenses"
                    element={<PrivateRoute element={Expenses} />}
                  />
                </Routes>
              </div>
            )
          }
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
