import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import SearchCustomer from "./SearchCustomer";
import BranchTransfer from "./BranchTransfer"; // Assuming you have this component

const LocalTransfer = () => {
  const [activeOperation, setActiveOperation] = useState(null);

  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "createCustomer":
        return <CreateCustomer />;
      case "searchCustomer":
        return <SearchCustomer />;
      case "branchTransfer":
        return <BranchTransfer />;
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
              onClick={() => handleOperation("createCustomer")}
            >
              Create Customer
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("searchCustomer")}
            >
              Search Customer
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("branchTransfer")}
            >
              Branch Transfer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LocalTransfer;
