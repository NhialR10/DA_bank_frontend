import React, { useContext, useState } from "react";
import SearchBox from "./SearchBox"; // Import the SearchBox component
import axios from "axios";
import { AuthContext } from "./AuthContext";
const { formatNumber } = require("../utils");
const DisplayUnpaidReciversOfAbranch = () => {
  const { userLogin } = useContext(AuthContext); // Access userLogin from context
  const [unpaidReceiver, setUnpaidReceiver] = useState(null); // State to hold the customer details
  const [searchResult, setSearchResult] = useState(""); // State to handle the search result message

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/branchToBranchTransfer/unpaid-receiver/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // Include token in headers
          },
        }
      );
      if (response.data) {
        setUnpaidReceiver(response.data);
        setSearchResult("");
      } else {
        setUnpaidReceiver(null);
        setSearchResult("No unpaid receiver found");
      }
    } catch (error) {
      setUnpaidReceiver(null); // Clear unpaidReceiver state on error
      setSearchResult("No unpaid receiver found.");
    }
  };

  const handlePay = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/branchToBranchTransfer/receive/${id}`,
        unpaidReceiver,
        {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // Include token in headers
          },
        }
      );
      alert("Receiver paid successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  return (
    <div className="user-display">
      <SearchBox placeholder="Reciever's Code" onSearch={handleSearch} />

      {unpaidReceiver ? (
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
            unpaid customer
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Sender</th>
              <th scope="col">Reciever</th>
              <th scope="col">Reciever No.</th>
              <th scope="col">Amount</th>
              <th scope="col">Confirm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{unpaidReceiver[0].timestamp.slice(0, 10)}</td>
              <td>{unpaidReceiver[0].firstname}</td>
              <td>{unpaidReceiver[0].Rfirstname}</td>
              <td>{unpaidReceiver[0].Rphone}</td>
              <td>{formatNumber(unpaidReceiver[0].amount)}</td>

              <td>
                <button
                  onClick={() => handlePay(unpaidReceiver[0]._id)}
                  className="btn btn-primary"
                >
                  {unpaidReceiver[0].isReceived ? "Received" : "Pay"}
                </button>
              </td>
            </tr>
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

export default DisplayUnpaidReciversOfAbranch;
