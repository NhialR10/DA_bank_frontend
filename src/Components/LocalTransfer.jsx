import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import SearchCustomer from "./SearchCustomer";
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";

import Borrow from "./Borrow";
import SendToBranch from "./SendToBranch";
import RecieveFromBranch from "./RecieveFromBranch";
import ViewAccountActivity from "./ViewAccountActivity";
import ViewBranchReceivings from "./ViewBranchReceivings";
import ViewBranchSendings from "./ViewBranchSendings";
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
      case "send":
        return <SendToBranch />;
      case "createAccount":
        return <CreateAccount />;
      case "deposit":
        return <Deposit accountToOperateOn={accountToOperateOn} />;
      case "View-activity":
        return (
          <ViewAccountActivity
            accountToOperateOn={accountToOperateOn}
            setAccountToOperateOn={setAccountToOperateOn}
          />
        );
      case "get-branch-receivings":
        return <ViewBranchReceivings />;
      case "get-branch-sendings":
        return <ViewBranchSendings />;
      case "borrow":
        return <Borrow accountToOperateOn={accountToOperateOn} />;
      case "recieve":
        return <RecieveFromBranch />;
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
              onClick={() => handleOperation("send")}
            >
              Send To Branch
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("get-branch-sendings")}
            >
              Branch Sendings
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("recieve")}
            >
              Recieve From Branch
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("get-branch-receivings")}
            >
              Branch Receivings
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
