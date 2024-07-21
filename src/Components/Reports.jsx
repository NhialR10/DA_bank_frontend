import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import AddExpenses from "./AddExpenses";
import ViewExpenses from "./ViewExpenses";
import { BranchContext } from "./BranchContext";
import CapitalOperation from "./CapitalOperation";
import ViewCapitalOperation from "./ViewCapitalOperation";
import AdminDashboard from "./AdminDashboard";
const Reports = () => {
  const [branches, setBranches] = useState([]);
  const { fetchBranches } = useContext(BranchContext);
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  useEffect(() => {
    // Fetch Branches when component mounts
    const getBranches = async () => {
      try {
        const fetchedBranches = await fetchBranches();
        setBranches(fetchedBranches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    getBranches();
  }, [fetchBranches]);

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "adminDashBoard":
        return <AdminDashboard branches={branches} />;
      case "viewCapitalOperation":
        return <ViewCapitalOperation />;

      default:
        return <div>Please select an operation</div>;
    }
  };
  return (
    <main className="main1-container">
      <div className="setting-container">
        <div className="setting-left">{renderOperationComponent()}</div>
        <div className="setting-right">
          <div className="operation-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("adminDashBoard")}
            >
              Admin Dashboard
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("viewCapitalOperation")}
            >
              View Capital Operation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;
