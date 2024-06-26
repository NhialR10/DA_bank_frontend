import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import SearchCustomer from "./SearchCustomer";
import BranchTransfer from "./BranchTransfer"; // Assuming you have this component
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Borrow from "./Borrow";

const LocalTransfer = () => {
  const [activeOperation, setActiveOperation] = useState(null);
  const [accountToOperateOn, setAccountToOperateOn] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "createCustomer":
        return <CreateCustomer />;
      case "searchCustomer":
        return (
          <SearchCustomer
            setAccountToOperateOn={setAccountToOperateOn}
            setActiveOperation={setActiveOperation}
          />
        );
      case "branchTransfer":
        return <BranchTransfer />;
      case "createAccount":
        return <CreateAccount />;
      case "deposit":
        return <Deposit accountToOperateOn={accountToOperateOn} />;
      case "withdrawal":
        return <Withdraw accountToOperateOn={accountToOperateOn} />;
      case "borrow":
        return <Borrow accountToOperateOn={accountToOperateOn} />;
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
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("createAccount")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LocalTransfer;
