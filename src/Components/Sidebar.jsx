import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaExchangeAlt, FaMoneyBillWave } from "react-icons/fa";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AuthContext } from "./AuthContext";
import {
  BsGrid1X2Fill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, setOpenSidebarToggle }) {
  const [selectedLink, setSelectedLink] = useState(null);
  const { userLogin } = useContext(AuthContext);
  const handleLinkClick = (path) => {
    if (selectedLink === path) {
      setOpenSidebarToggle(false); // Close sidebar only if clicking a different link
    } else {
      setSelectedLink(path); // Update selected link state
      setOpenSidebarToggle(false);
    }
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">TRUST LINK FX</div>
        <span
          className="icon close_icon"
          onClick={() => setOpenSidebarToggle(false)}
        >
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/" onClick={() => handleLinkClick("/")}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/local-transfer" onClick={() => handleLinkClick("/")}>
            <FaExchangeAlt className="icon" /> Local Banking
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            to="/momo_mpessa"
            onClick={() => handleLinkClick("/momo_mpessa")}
          >
            <RiExchangeFundsLine className="icon" /> M-Pesa and Momo UG
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/forex" onClick={() => handleLinkClick("/forex")}>
            <FaExchangeAlt className="icon" /> Forex Transactions
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/expenses" onClick={() => handleLinkClick("/expenses")}>
            <FaMoneyBillWave className="icon" /> Expenses Management
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link
            to="/capital_operations"
            onClick={() => handleLinkClick("/capital_operations")}
          >
            <FaMoneyBillWave className="icon" /> Capital Management
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/reports" onClick={() => handleLinkClick("/reports")}>
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/settings" onClick={() => handleLinkClick("/settings")}>
            <BsFillGearFill className="icon" /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
