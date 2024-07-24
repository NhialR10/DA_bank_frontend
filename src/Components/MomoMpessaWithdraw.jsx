import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import formatNumber from "../utils";
const MomoMpessaWithdraw = () => {
  const [loading, setLoading] = useState(false);

  const { userLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    WithdrawerName: "",
    WithdrawerPhone: "",
    PayAmount: "",
    CurrencyToWithdraw: "",
    WithdrawingPhone: "",
    CurrencyToPay: "",
    WithdrawAmount: "",
  });

  const ResetFormField = () => {
    setFormData({
      WithdrawerName: "",
      WithdrawerPhone: "",
      PayAmount: "",
      CurrencyToWithdraw: "",
      WithdrawingPhone: "",
      CurrencyToPay: "",
      WithdrawAmount: "",
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
    if (formData.receiverBranch === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/MomoMpesawithdraw/withdraw",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        ResetFormField();
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
        alert("Withdraw record saved successfully!");
      }
    }
  };

  return (
    <div className="sendTobranch">
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Withdrawing's Details</h3>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            Withdrawer Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Sender Name"
            name="WithdrawerName"
            value={formData.WithdrawerName}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Withdrawer Contact
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="WithdrawerPhone"
            value={formData.WithdrawerPhone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Number To Withdraw From
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="WithdrawingPhone"
            value={formData.WithdrawingPhone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount To Withdraw
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="WithdrawAmount"
            min="0"
            value={formData.WithdrawAmount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Currency To Withdraw
          </label>
          <select
            className={`form-select custom-input ${
              !isValid ? "is-invalid" : ""
            }`}
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            name="CurrencyToWithdraw"
            value={formData.CurrencyToWithdraw}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="ksh">KSH</option>
            <option value="ugx">UGX</option>
          </select>
          {!isValid && (
            <div id="validationServerRoleFeedback" className="invalid-feedback">
              Please select a valid branch.
            </div>
          )}
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Currency To Pay
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

        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount To Pay
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="PayAmount"
            min="0"
            value={formData.PayAmount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MomoMpessaWithdraw;
