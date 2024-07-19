import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");

const ViewBranchSendings = () => {
  const { userLogin } = useContext(AuthContext);
  const [branchSendings, setBranchSendings] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/branchToBranchTransfer/sendings?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setBranchSendings(response.data);
          console.log(response.data);
          setResult("");
        } else {
          setBranchSendings(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setBranchSendings(null);
        setResult("NO RECORD FOUND");
      }
    }
  };
  return (
    <>
      <h3>Select date range to display branch Sendings</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />
      <div className="user-display">
        {branchSendings?.length ? (
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
                <th scope="col">Sender</th>
                <th scope="col">Phone</th>
                <th scope="col">Receiver</th>
                <th scope="col">Branch</th>
                <th scope="col">Amount</th>
                <th scope="col">Remark</th>
              </tr>
            </thead>
            <tbody>
              {branchSendings.map((branchSendings, index) => (
                <tr key={index}>
                  <td>{branchSendings.timestamp.slice(0, 10)}</td>
                  <td>
                    {branchSendings.Userdetails.firstname}{" "}
                    {branchSendings.Userdetails.lastname}
                  </td>
                  <td>{branchSendings.phone}</td>
                  <td>{branchSendings.Rfirstname}</td>

                  <td>{branchSendings.ReceivingBranchDetails.name}</td>

                  <td>{formatNumber(branchSendings.amount)}</td>
                  <td>{branchSendings.isReceived ? "Paid" : "Pending"}</td>
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
export default ViewBranchSendings;
