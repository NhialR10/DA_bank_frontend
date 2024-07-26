import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CreateAccount = () => {
  const { userLogin } = useContext(AuthContext); // Access userLogin from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState({
    customerCode: "",
    currency: "",
  });

  const resetForm = () => {
    setAccount({
      customerCode: "",
      currency: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevData) => ({
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
        "https://trustlinks-api.onrender.com/api/accounts/create",
        account,
        {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // Include token in headers
          },
        }
      );

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
            Customer ID
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Customer Id"
            name="customerCode"
            autoComplete="off"
            onChange={handleChange}
            value={account.customerCode} // Bind value to state
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Currency
          </label>
          <select
            className="form-select custom-input"
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            onChange={handleChange}
            name="currency"
            value={account.currency} // Bind value to state
          >
            <option value="">Choose...</option>
            <option value="ssp">SSP</option>
            <option value="usd">USD</option>
          </select>
          <div id="validationServerRoleFeedback" className="invalid-feedback">
            Please select a valid currency.
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
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

export default CreateAccount;
