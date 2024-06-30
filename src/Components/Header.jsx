import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { BsSearch, BsJustify } from "react-icons/bs";

function Header({ OpenSidebar }) {
  const { logout } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <button onClick={() => logout()} className="btn btn-danger">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
