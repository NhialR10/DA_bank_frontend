import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");
const ViewBranchReceivings = () => {
  const { userLogin } = useContext(AuthContext);
  const [branchReceiving, setBranchReceivings] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/branchToBranchTransfer/paid-receivers?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setBranchReceivings(response.data);
          console.log(response.data);
          setResult("");
        } else {
          setBranchReceivings(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setBranchReceivings(null);
        setResult("NO RECORD FOUND");
      }
    }
  };
  return (
    <>
      <h3>Select date range to display branch receivings</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />
      <div className="user-display">
        {branchReceiving?.length ? (
          <table className="table caption-top user-display">
            <caption
              style={{
                color: "#2962ff",
                textAlign: "center",
                textTransform: "capitalize",
                fontWeight: "700",
                fontSize: "20px",
              }}
            ></caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Receiver Name</th>
                <th scope="col">Amount</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              {branchReceiving.map((branchReceiving, index) => (
                <tr key={index}>
                  <td>{branchReceiving.date_received.slice(0, 10)}</td>
                  <td>{branchReceiving.Rfirstname}</td>
                  <td>{formatNumber(branchReceiving.amount)}</td>

                  <td>
                    {branchReceiving.Userdetails.firstname}{" "}
                    {branchReceiving.Userdetails.lastname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          result && (
            <div className="mt-3">
              <h5>{result}</h5>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ViewBranchReceivings;
