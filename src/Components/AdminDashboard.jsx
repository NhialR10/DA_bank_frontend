import React, { useEffect, useState } from "react";
import { formatNumber } from "../utils";
const AdminDashboard = ({ branches }) => {
  const [totalBalances, setTotalBalances] = useState({
    dollarsBalance: 0,
    sspBalance: 0,
    ugxBalance: 0,
    kenyaBalance: 0,
  });

  useEffect(() => {
    const totals = branches.reduce(
      (totals, branch) => {
        totals.dollarsBalance += branch.dollarsAmount;
        totals.sspBalance += branch.sspAmount;
        totals.ugxBalance += branch.ugxAmount;
        totals.kenyaBalance += branch.kshAmount;
        return totals;
      },
      { dollarsBalance: 0, sspBalance: 0, ugxBalance: 0, kenyaBalance: 0 }
    );

    setTotalBalances(totals);
  }, [branches]);
  return (
    <>
      <div class="card text-bg-secondary" style={{ width: "100%" }}>
        <div class="card-header">TOTAL AMOUNTS</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>USD AMOUNT</span>{" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(totalBalances.dollarsBalance)}
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>SSP AMOUNT</span>{" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(totalBalances.sspBalance)}
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>KSH AMOUNT</span>{" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(totalBalances.kenyaBalance)}
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>UGX AMOUNT</span>{" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(totalBalances.ugxBalance)}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="cards-container">
        {branches.map((branch) => (
          <div class="card text-bg-secondary" style={{ width: "100%" }}>
            <div class="card-header">{branch.name}</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>USD AMOUNT</span>{" "}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {formatNumber(branch.dollarsAmount)}
                  </span>
                </div>
              </li>
              <li class="list-group-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>UGX AMOUNT</span>{" "}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {formatNumber(branch.ugxAmount)}
                  </span>
                </div>
              </li>
              <li class="list-group-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>KSH AMOUNT</span>{" "}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {formatNumber(branch.kshAmount)}
                  </span>
                </div>
              </li>
              <li class="list-group-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>SSP AMOUNT</span>{" "}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {formatNumber(branch.sspAmount)}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
