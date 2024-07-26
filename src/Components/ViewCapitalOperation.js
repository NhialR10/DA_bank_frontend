import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");
const ViewCapitalOperation = () => {
  const { userLogin } = useContext(AuthContext);
  const [capitalOperation, setcapitalOperation] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `https://trustlinks-api.onrender.com/api/capitalOperation/view-operations?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setcapitalOperation(response.data);

          setResult("");
        } else {
          setcapitalOperation(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setcapitalOperation(null);
        setResult("NO RECORD FOUND");
      }
    }
  };

  return (
    <>
      <h3>Select date range</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />

      <div className="user-display">
        {capitalOperation?.length ? (
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
                <th scope="col">Currency</th>
                <th scope="col">Amount</th>
                <th scope="col">Branch</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {capitalOperation.map((capitalOperation, index) => (
                <tr key={index}>
                  <td>{capitalOperation.timestamp.slice(0, 10)}</td>
                  <td>{capitalOperation.CurrencyType.toUpperCase()}</td>
                  <td
                    style={
                      capitalOperation.OperationType === "deposite"
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {formatNumber(capitalOperation.Amount)}
                  </td>
                  <td>{capitalOperation.BranchDetails.name}</td>
                  <td>{capitalOperation.OperationType}</td>
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

export default ViewCapitalOperation;
