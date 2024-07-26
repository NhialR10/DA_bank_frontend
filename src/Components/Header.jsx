import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { BsJustify } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import axios from "axios";

function Header({ OpenSidebar }) {
  const { logout, userLogin } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://trustlinks-api.onrender.com/api/users/logout",
        {},
        { withCredentials: true }
      );
      logout();
      alert("Logout Successful");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout Failed");
    }
  };
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
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
