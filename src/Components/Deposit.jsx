import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const Deposit = ({ accountToOperateOn }) => {
  const { userLogin } = useContext(AuthContext); // Access userLogin from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState({
    amount: "",
    type: "deposit",
  });

  const resetForm = () => {
    setTransaction({
      amount: "",
      type: "deposit", // Ensure type is not lost
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.post(
        `https://trustlinks-api.onrender.com/api/transactions/create/${accountToOperateOn._id}`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // Include token in headers
          },
        }
      );
      resetForm();
    } catch (error) {
      console.error("Error depositing:", error);
      setError("Failed to deposit. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            Deposit Amount
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Deposit"
            name="amount"
            autoComplete="off"
            onChange={handleChange}
            value={transaction.amount} // Bind value to state
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Depositing..." : "Deposit"}
          </button>
        </div>
        {error && (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Deposit;
