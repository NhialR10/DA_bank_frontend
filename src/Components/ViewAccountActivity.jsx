import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");
const ViewAccountActivity = ({ accountToOperateOn, setAccountToOperateOn }) => {
  const { userLogin } = useContext(AuthContext);
  const [accountActivity, setAccountActivity] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/transactions/${accountToOperateOn._id}?end=${formattedEndDate}&start=${formattedStartDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setAccountActivity(response.data);
          console.log(response.data);
          setResult("");
        } else {
          setAccountActivity(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setAccountActivity(null);
        setResult("NO RECORD FOUND");
      }
    }
  };

  return (
    <>
      <h3>Please select date range to display account activity</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />

      <div className="user-display">
        {accountActivity?.length ? (
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
                <th scope="col">Amount</th>
                <th scope="col">User Name</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {accountActivity.map((accountActivity, index) => (
                <tr key={index}>
                  <td>{accountActivity.timestamp.slice(0, 10)}</td>
                  <td
                    style={
                      accountActivity.type === "deposit"
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {formatNumber(accountActivity.amount)}
                  </td>
                  <td>
                    {accountActivity.Userdetails.firstname}{" "}
                    {accountActivity.Userdetails.lastname}
                  </td>
                  <td>{accountActivity.type}</td>
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

export default ViewAccountActivity;
