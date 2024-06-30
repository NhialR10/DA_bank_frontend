import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
const Borrow = ({ accountToOperateOn }) => {
  const { userLogin } = useContext(AuthContext); // Access userLogin from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState({
    amount: "",
    type: "withdrawal",
  });

  const resetForm = () => {
    setTransaction({
      amount: "",
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
        `http://localhost:8000/api/transactions/create/${accountToOperateOn._id}`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${userLogin}`, // Include token in headers
          },
        }
      );
      console.log(accountToOperateOn._id);
      console.log("Account created:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Failed to create account. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            Withdraw Amount
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Withdraw"
            name="amount"
            autoComplete="off"
            onChange={handleChange}
            value={transaction.amount} // Bind value to state
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Withdrawing..." : "Withdraw"}
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

export default Borrow;
