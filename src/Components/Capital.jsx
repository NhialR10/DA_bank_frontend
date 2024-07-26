import React, { useContext, useEffect, useState } from "react";

import { BranchContext } from "./BranchContext";
import CapitalOperation from "./CapitalOperation";
import ViewCapitalOperation from "./ViewCapitalOperation";
const Capital = () => {
  const [branches, setBranches] = useState([]);
  const { fetchBranches } = useContext(BranchContext);
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "capitalOperation":
        return <CapitalOperation branches={branches} />;
      case "viewCapitalOperation":
        return <ViewCapitalOperation />;

      default:
        return <div>Please select an operation</div>;
    }
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

  return (
    <main className="main1-container">
      <div className="setting-container">
        <div className="setting-left">{renderOperationComponent()}</div>
        <div className="setting-right">
          <div className="operation-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("capitalOperation")}
            >
              Capital Operation
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

export default Capital;
