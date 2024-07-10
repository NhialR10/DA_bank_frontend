import React, { useState } from "react";
import MomoMpessaSend from "./MomoMpessaSend";
import MomoMpessaWithdraw from "./MomoMpessaWithdraw";

const MpessaMomo = () => {
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "send":
        return <MomoMpessaSend />;
      case "withdraw":
        return <MomoMpessaWithdraw />;

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
              onClick={() => handleOperation("send")}
            >
              Mpesa & Momo Transfer
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("withdraw")}
            >
              Mpesa & Momo Withdraw
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MpessaMomo;
