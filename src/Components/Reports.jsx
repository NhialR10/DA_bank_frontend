import React, { useContext, useEffect, useState } from "react";
import { BranchContext } from "./BranchContext";
import AdminDashboard from "./AdminDashboard";
import ViewDators from "./ViewDators";
import ViewCreditors from "./ViewCreditors";
import CalculateCapital from "./CalculateCapital";
const Reports = () => {
  const [branches, setBranches] = useState([]);
  const [dollarsAccounts, setDollarsAccounts] = useState([]);
  const [sspAccounts, setSspAccounts] = useState([]);
  const [creditors, setCreditors] = useState([]);
  const [debtors, setDebtors] = useState([]);
  const [unpaiBankReceiver, setUpaidBankReceivers] = useState([]);
  const { fetchBranches, fetchCreditorsAndDebtors, fetchUnpaidBankReceivers } =
    useContext(BranchContext);
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

  useEffect(() => {
    // Fetch Branches when component mounts
    const getUnpaidBankReceivers = async () => {
      try {
        const unpaidBReceivers = await fetchUnpaidBankReceivers();
        setUpaidBankReceivers(unpaidBReceivers);
      } catch (error) {
        console.error("Unpaid Bank Receivers:", error);
      }
    };
    getUnpaidBankReceivers();
  }, [fetchUnpaidBankReceivers]);

  useEffect(() => {
    // Fetch accounts when component mounts
    const getBranches = async () => {
      try {
        const fetchedCreditorsAndDebtors = await fetchCreditorsAndDebtors();

        setCreditors(
          fetchedCreditorsAndDebtors.filter((account) => account.balance > 0)
        );
        setDebtors(
          fetchedCreditorsAndDebtors.filter((account) => account.balance < 0)
        );
        setDollarsAccounts(
          fetchedCreditorsAndDebtors.filter(
            (account) => account.currency === "usd"
          )
        );
        setSspAccounts(
          fetchedCreditorsAndDebtors.filter(
            (account) => account.currency === "ssp"
          )
        );
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    getBranches();
  }, [fetchCreditorsAndDebtors]);

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "adminDashBoard":
        return <AdminDashboard branches={branches} />;
      case "calculate-profit":
        return (
          <CalculateCapital
            dollarsAccounts={dollarsAccounts}
            sspAccounts={sspAccounts}
            branches={branches}
            unpaiBankReceiver={unpaiBankReceiver}
          />
        );
      case "viewDebtors":
        return <ViewDators debtors={debtors} />;
      case "ViewCreditors":
        return <ViewCreditors creditors={creditors} />;

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
              onClick={() => handleOperation("calculate-profit")}
            >
              Calculate Profit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("ViewCreditors")}
            >
              View Creditors
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleOperation("viewDebtors")}
            >
              View Debtors
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;
