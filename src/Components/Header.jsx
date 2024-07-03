import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { BsJustify } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

function Header({ OpenSidebar }) {
  const { logout, userLogin } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left card1-inner">
        <div>
          <FaUser style={{ fontSize: "20px" }} className="icon" />
        </div>
        <h3 style={{ marginBottom: "7px" }} className="name">
          {userLogin.firstname} {userLogin.lastname}
        </h3>
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
