import React, { useState } from "react";
import SearchBox from "./SearchBox"; // Import the SearchBox component
import axios from "axios";
const DisplayUnpaidReciversOfAbranch = () => {
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

  const handleAcount = (account) => {};

  return (
    <div className="user-display">
      <SearchBox placeholder="Reciever's Code" onSearch={handleSearch} />

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
            <td>07/07/2027</td>
            <td>Nhial Lual</td>
            <td>Achok Yolo</td>
            <td>0956608743</td>
            <td>10,000</td>

            <td>
              <button className="btn btn-primary">Pay</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUnpaidReciversOfAbranch;
