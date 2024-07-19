import React, { useState } from "react";
import MomoMpessaSend from "./MomoMpessaSend";
import MomoMpessaWithdraw from "./MomoMpessaWithdraw";
import MomoMpesaSendings from "./MomoMpesaSendings";
import MomoMpesaWithdrawings from "./MomoMpesaWithdrawings";

const MpessaMomo = () => {
  const [activeOperation, setActiveOperation] = useState(null);
  const handleOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "send":
        return <MomoMpessaSend />;
      case "sendings":
        return <MomoMpesaSendings />;
      case "withdraw":
        return <MomoMpessaWithdraw />;
      case "withdrawings":
        return <MomoMpesaWithdrawings />;

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
              onClick={() => handleOperation("sendings")}
            >
              View Mpesa & Momo Transfers
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("withdraw")}
            >
              Mpesa & Momo Withdraw
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("withdrawings")}
            >
              View Mpesa & Momo Withdrawings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MpessaMomo;
