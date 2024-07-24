import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");

const MomoMpesaWithdrawings = () => {
  const { userLogin } = useContext(AuthContext);
  const [MpesaMomoWithdrawings, setMpesaMomoWithdrawings] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/MomoMpesawithdraw/view?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setMpesaMomoWithdrawings(response.data);

          setResult("");
        } else {
          setMpesaMomoWithdrawings(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setMpesaMomoWithdrawings(null);
        setResult("NO RECORD FOUND");
      }
    }
  };
  return (
    <>
      <h3>Select date range to display Mpesa and Momo Withdrawings</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />
      <div className="user-display">
        {MpesaMomoWithdrawings?.length ? (
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
                <th scope="col">Withdrawer</th>
                <th scope="col">Withdrawer's Contact</th>
                <th scope="col">Withdrawing Phone</th>
                <th scope="col">Withdrawn Amount</th>
                <th scope="col">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {MpesaMomoWithdrawings.map((MpesaMomoWithdrawings, index) => (
                <tr key={index}>
                  <td>{MpesaMomoWithdrawings.timestamp.slice(0, 10)}</td>
                  <td>
                    {MpesaMomoWithdrawings.Userdetails.firstname}{" "}
                    {MpesaMomoWithdrawings.Userdetails.lastname}
                  </td>
                  <td>{MpesaMomoWithdrawings.WithdrawerName}</td>
                  <td>{MpesaMomoWithdrawings.WithdrawerPhone}</td>
                  <td>{MpesaMomoWithdrawings.WithdrawingPhone}</td>
                  <td>
                    {MpesaMomoWithdrawings.CurrencyToWithdraw}{" "}
                    {formatNumber(MpesaMomoWithdrawings.WithdrawAmount)}
                  </td>
                  <td>
                    {MpesaMomoWithdrawings.CurrencyToPay === "usd"
                      ? "$"
                      : MpesaMomoWithdrawings.CurrencyToPay}{" "}
                    {formatNumber(MpesaMomoWithdrawings.PayAmount)}
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

export default MomoMpesaWithdrawings;
