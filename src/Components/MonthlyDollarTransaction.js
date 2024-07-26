import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");

const MonthlyDollarTransaction = () => {
  const { userLogin } = useContext(AuthContext);
  const [branchDollarExchange, setbranchDollarExchange] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `https://trustlinks-api.onrender.com/api/dollarTransaction/get-transactions?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setbranchDollarExchange(response.data);

          setResult("");
        } else {
          setbranchDollarExchange(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setbranchDollarExchange(null);
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
        {branchDollarExchange?.length ? (
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
                <th scope="col">User</th>
                <th scope="col">Customer</th>
                <th scope="col">Phone</th>
                <th scope="col">Rate</th>
                <th scope="col">Amount($)</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {branchDollarExchange.map((branchDollarExchange, index) => (
                <tr key={index}>
                  <td>{branchDollarExchange.timestamp.slice(0, 10)}</td>
                  <td>
                    {branchDollarExchange.Userdetails.firstname}{" "}
                    {branchDollarExchange.Userdetails.lastname}
                  </td>
                  <td>{branchDollarExchange.name} </td>
                  <td>{branchDollarExchange.phone}</td>
                  <td>{formatNumber(branchDollarExchange.rate)}</td>
                  <td>{formatNumber(branchDollarExchange.AmountDollars)}</td>
                  <td>{branchDollarExchange.type}</td>
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

export default MonthlyDollarTransaction;
