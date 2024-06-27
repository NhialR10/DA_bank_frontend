import React, { useState } from "react";
import SearchBox from "./SearchBox"; // Import the SearchBox component
import axios from "axios";
const DisplayUserAndAccount = () => {
  const [customer, setCustomer] = useState(null); // State to hold the customer details
  const [searchResult, setSearchResult] = useState(""); // State to handle the search result message

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers/get-A-Customer/${searchTerm}`
      );
      if (response.data) {
        setCustomer(response.data);
        console.log(response.data);
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

  return (
    <div className="user-display">
      <SearchBox onSearch={handleSearch} />
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
              <th scope="col">Take Loan</th>
            </tr>
          </thead>
          <tbody>
            {customer.accounts.map((account, index) => (
              <tr key={index}>
                <td>{account.currency === "usd" ? "USD" : "SSP"}</td>
                <td>{account.user.firstname}</td>
                <td>{account.balance}</td>
                <td>
                  <button className="btn btn-primary">Deposit</button>
                </td>
                <td>
                  <button className="btn btn-secondary">Withdraw</button>
                </td>
                <td>
                  <button className="btn btn-secondary">Borrow</button>
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
