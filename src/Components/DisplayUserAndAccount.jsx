import React, { useState } from "react";
import SearchBox from "./SearchBox"; // Import the SearchBox component
import axios from "axios";
const DisplayUserAndAccount = ({
  setActiveOperation,
  setAccountToOperateOn,
}) => {
  const [customer, setCustomer] = useState(null); // State to hold the customer details
  const [searchResult, setSearchResult] = useState(""); // State to handle the search result message

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers/get-A-Customer/${searchTerm}`
      );
      if (response.data) {
        setCustomer(response.data);
        setSearchResult("");
      } else {
        setCustomer(null);
        setSearchResult("No customer found");
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      setCustomer(null);
      setSearchResult("No customer found");
    }
  };

  const handleAcount = (account) => {
    setAccountToOperateOn(account);
  };

  return (
    <div className="user-display">
      <SearchBox placeholder="Customer Code" onSearch={handleSearch} />
      {customer ? (
        <table className="table caption-top user-display">
          <caption
            style={{
              color: "#2962ff",
              textAlign: "center",
              textTransform: "capitalize",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            {customer.firstname} {customer.lastname}
          </caption>
          <thead>
            <tr>
              <th scope="col">Account Type</th>
              <th scope="col">Creator</th>
              <th scope="col">Balance</th>
              <th scope="col">Deposit</th>
              <th scope="col">Withdraw</th>
              <th scope="col">Account Activity</th>
            </tr>
          </thead>
          <tbody>
            {customer.accounts.map((account, index) => (
              <tr key={index}>
                <td>{account.currency === "usd" ? "USD" : "SSP"}</td>
                <td>
                  {account.user.firstname} {account.user.lastname}
                </td>
                <td>{account.balance}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveOperation("deposit");
                      handleAcount(account);
                    }}
                  >
                    Deposit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setActiveOperation("withdraw");
                      handleAcount(account);
                    }}
                    className="btn btn-secondary"
                  >
                    Withdraw
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setActiveOperation("View-activity");
                      handleAcount(account);
                    }}
                    className="btn btn-secondary"
                  >
                    Account Activity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        searchResult && (
          <div className="mt-3">
            <h5>{searchResult}</h5>
          </div>
        )
      )}
    </div>
  );
};

export default DisplayUserAndAccount;
