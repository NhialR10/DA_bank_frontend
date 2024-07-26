import React, { useState } from "react";

import AddExpenses from "./AddExpenses";
import ViewExpenses from "./ViewExpenses";
const Expenses = () => {
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "add":
        return <AddExpenses />;
      case "view":
        return <ViewExpenses />;

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
              onClick={() => handleOperation("add")}
            >
              Add Expenses
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("view")}
            >
              View Expenses
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Expenses;
