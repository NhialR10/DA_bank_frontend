import React from "react";
const { formatNumber } = require("../utils");
const ViewDators = ({ debtors }) => {
  return (
    <>
      <h3>List of debtors</h3>
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
            {debtors.map((debtor, index) => (
              <tr key={index}>
                <td>
                  {debtor.customer_id.firstname} {debtor.customer_id.lastname}
                </td>
                <td>{debtor.currency.toUpperCase()}</td>
                <td>{formatNumber(Math.abs(debtor.balance))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewDators;
