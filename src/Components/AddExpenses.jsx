import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const AddExpenses = () => {
  const [loading, setLoading] = useState(false);

  const { userLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    PaidAmount: "",
    Description: "",
    CurrencyToPay: "",
  });

  const ResetFormField = () => {
    setFormData({
      PaidAmount: "",
      Description: "",
      CurrencyToPay: "",
    });
  };

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.CurrencyToReceive === "" || formData.CurrencyToSend === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/expenses/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        ResetFormField();
        alert("Expenses record added Successfully!");
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="sendTobranch">
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount Paid
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="PaidAmount"
            min="0"
            value={formData.PaidAmount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerCommission" className="form-label">
            Description
          </label>
          <input
            type="text"
            step="any"
            className="form-control custom-input"
            id="validationServerCommission"
            placeholder="Description"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            min="0"
            required
          />
          <div className="invalid-feedback">
            This field is required and must be a non-negative value.
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Currency To Send
          </label>
          <select
            className={`form-select custom-input ${
              !isValid ? "is-invalid" : ""
            }`}
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            name="CurrencyToPay"
            value={formData.CurrencyToPay}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="usd">USD</option>
            <option value="ssp">SSP</option>
          </select>
          {!isValid && (
            <div id="validationServerRoleFeedback" className="invalid-feedback">
              Please select a valid branch.
            </div>
          )}
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenses;
