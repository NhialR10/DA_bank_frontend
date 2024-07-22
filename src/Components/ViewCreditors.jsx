import React from "react";
const { formatNumber } = require("../utils");
const ViewCreditors = ({ creditors }) => {
  return (
    <>
      <h3>List of creditors</h3>
      <div className="user-display">
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
              <th scope="col">Customer</th>
              <th scope="col">Currency</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {creditors.map((creditor, index) => (
              <tr key={index}>
                <td>
                  {creditor.customer_id.firstname}{" "}
                  {creditor.customer_id.lastname}
                </td>
                <td>{creditor.currency.toUpperCase()}</td>
                <td>{formatNumber(creditor.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewCreditors;
