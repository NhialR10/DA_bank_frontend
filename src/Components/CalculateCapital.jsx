import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../utils";

const CalculateCapital = ({ dollarsAccounts, sspAccounts, branches }) => {
  const [dollarsBalance, setDollarsBallance] = useState({ dollarsBalance: 0 });
  const [poundsBallance, setPoundsBallance] = useState({ poundsBalance: 0 });
  const [capital, setCapital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profitResults, setProfitResults] = useState(false);
  const [rates, setRates] = useState({
    ugxRate: "",
    kshRate: "",
    sspRate: "",
  });
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

  useEffect(() => {
    const totals = dollarsAccounts.reduce(
      (totals, account) => {
        totals.dollarsBalance += account.balance;
        return totals;
      },
      { dollarsBalance: 0 }
    );

    setDollarsBallance(totals);
  }, [dollarsAccounts]);

  useEffect(() => {
    const totals = sspAccounts.reduce(
      (totals, account) => {
        totals.poundsBalance += account.balance;
        return totals;
      },
      { poundsBalance: 0 }
    );

    setPoundsBallance(totals);
  }, [sspAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        "https://trustlinks-api.onrender.com/api/capitalOperation/capital"
      );
      setCapital(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
      setProfitResults(true);
    }
  };
  let amountUgxtoDollars = totalBalances.ugxBalance / (rates.ugxRate / 100);
  let amountKshToDollars = totalBalances.kenyaBalance / (rates.kshRate / 100);
  let amountPoundsToDollars = totalBalances.sspBalance / (rates.sspRate / 100);

  let totalMoneyIntheBussinessInDollars =
    amountUgxtoDollars +
    amountKshToDollars +
    amountPoundsToDollars +
    totalBalances.dollarsBalance;
  let totalBussinessMoneyIntheBussinessInDollars =
    totalMoneyIntheBussinessInDollars -
    dollarsBalance.dollarsBalance -
    poundsBallance.poundsBalance / (rates.sspRate / 100);

  let totalCapitalInDollars =
    capital?.AmountInDollars + capital?.AmountInSsp / (rates.sspRate / 100);
  let profit =
    totalBussinessMoneyIntheBussinessInDollars - totalCapitalInDollars;

  return (
    <>
      <div>
        <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="validationServer01" className="form-label">
              UGX RATE(100$)
            </label>
            <input
              type="number"
              className="form-control custom-input"
              id="validationServer01"
              placeholder="UGX RATE"
              name="ugxRate"
              min={1}
              autoComplete="off"
              value={rates.ugxRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationServer01" className="form-label">
              SSP RATE(100$)
            </label>
            <input
              type="number"
              className="form-control custom-input"
              id="validationServer01"
              placeholder="SSP RATE"
              name="sspRate"
              autoComplete="off"
              min={1}
              value={rates.sspRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="validationServer01" className="form-label">
              KSH RATE(100$)
            </label>
            <input
              type="number"
              className="form-control custom-input"
              id="validationServer01"
              placeholder="KSH RATE"
              name="kshRate"
              autoComplete="off"
              min={1}
              value={rates.kshRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </div>
        </form>
      </div>
      {profitResults ? (
        <div
          class="card text-bg-secondary profit-card"
          style={{ width: "100%", marginTop: "40px" }}
        >
          <div class="card-header">PROFIT CALCULATION RESULTS</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>TOTAL MONEY($)</span>{" "}
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(totalBussinessMoneyIntheBussinessInDollars)}
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
                <span>CAPITAL($)</span>{" "}
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(totalCapitalInDollars)}
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
                <span>NET PROFIT($)</span>{" "}
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(profit)}
                </span>
              </div>
            </li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => setProfitResults(false)}
          >
            OK
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CalculateCapital;
