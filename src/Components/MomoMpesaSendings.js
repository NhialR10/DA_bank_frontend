import axios from "axios";
import React, { useContext, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { AuthContext } from "./AuthContext";
import { formatNumber } from "../utils";
const { formatDate } = require("../utils");
const MomoMpesaSendings = () => {
  const { userLogin } = useContext(AuthContext);
  const [MpesaMomoSendings, setMpesaMomoSendings] = useState(null);
  const [result, setResult] = useState("NO RECORD FOUND");
  const handleDateChange = async (range) => {
    if (range) {
      const startDates = range[0].toLocaleDateString("en-GB");
      const endDates = range[1].toLocaleDateString("en-GB");
      const formattedStartDate = formatDate(startDates);
      const formattedEndDate = formatDate(endDates);
      try {
        const response = await axios.get(
          `https://trustlinks-api.onrender.com/api/MomoMpesa/view?start=${formattedStartDate}&end=${formattedEndDate}`,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        if (response?.data?.length) {
          setMpesaMomoSendings(response.data);

          setResult("");
        } else {
          setMpesaMomoSendings(null);
          setResult("NO RECORD FOUND");
        }
      } catch (error) {
        console.error("Error fetching Account activity:", error);
        setMpesaMomoSendings(null);
        setResult("NO RECORD FOUND");
      }
    }
  };
  return (
    <>
      <h3>Select date range to display Mpesa and Momo Sendings</h3>
      <DateRangePicker
        placeholder="Select Date Range"
        onChange={handleDateChange}
      />
      <div className="user-display">
        {MpesaMomoSendings?.length ? (
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
                <th scope="col">Sender</th>
                <th scope="col">Sender's Contact</th>
                <th scope="col">Sent Amount</th>
                <th scope="col">Receiver</th>
                <th scope="col">Receiving Phone</th>
                <th scope="col">Received Amount</th>
              </tr>
            </thead>
            <tbody>
              {MpesaMomoSendings.map((MpesaMomoSendings, index) => (
                <tr key={index}>
                  <td>{MpesaMomoSendings.timestamp.slice(0, 10)}</td>
                  <td>
                    {MpesaMomoSendings.Userdetails.firstname}{" "}
                    {MpesaMomoSendings.Userdetails.lastname}
                  </td>
                  <td>{MpesaMomoSendings.SenderName}</td>
                  <td>{MpesaMomoSendings.SenderPhone}</td>

                  <td>
                    {MpesaMomoSendings.CurrencyToSend === "usd"
                      ? "$"
                      : MpesaMomoSendings.CurrencyToSend}{" "}
                    {MpesaMomoSendings.SendAmount}
                  </td>
                  <td>{MpesaMomoSendings.ReceiverName}</td>
                  <td>{MpesaMomoSendings.ReceiverPhone}</td>

                  <td>
                    {MpesaMomoSendings.CurrencyToReceive}{" "}
                    {formatNumber(MpesaMomoSendings.ReceiveAmount)}
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

export default MomoMpesaSendings;
