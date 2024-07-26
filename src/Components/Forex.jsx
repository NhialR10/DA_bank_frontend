import React, { useState } from "react";

import DollarTransaction from "./DollarTransaction";
import MonthlyDollarTransaction from "./MonthlyDollarTransaction";
const Forex = () => {
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "transaction":
        return <DollarTransaction />;
      case "view":
        return <MonthlyDollarTransaction />;

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
              onClick={() => handleOperation("transaction")}
            >
              Dollar Transaction
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("view")}
            >
              View Dollar Transaction
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Forex;
