import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const MomoMpessaSend = () => {
  const [loading, setLoading] = useState(false);

  const { userLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    SenderName: "",
    SenderPhone: "",
    SendAmount: "",
    CurrencyToSend: "",
    Commission: "",
    ReceiverName: "",
    ReceiverPhone: "",
    CurrencyToReceive: "",
    ReceiveAmount: "",
    ChargesAmount: "",
  });

  const ResetFormField = () => {
    setFormData({
      SenderName: "",
      SenderPhone: "",
      SendAmount: "",
      CurrencyToSend: "",
      Commission: "",
      ReceiverName: "",
      ReceiverPhone: "",
      CurrencyToReceive: "",
      ReceiveAmount: "",
      ChargesAmount: "",
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
          "http://localhost:8000/api/MomoMpesa/send",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        ResetFormField();
        alert("Sending record saved Successfully!");
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
        alert("Sending record saved Successfully!");
      }
    }
  };

  return (
    <div className="sendTobranch">
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Sender's Details</h3>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            Sender Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Sender Name"
            name="SenderName"
            value={formData.SenderName}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Sender Contact
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="SenderPhone"
            value={formData.SenderPhone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount To Send
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="SendAmount"
            min="0"
            value={formData.SendAmount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerCommission" className="form-label">
            Commission Amount (SSP)
          </label>
          <input
            type="number"
            step="any"
            className="form-control custom-input"
            id="validationServerCommission"
            placeholder="Percentage Commission"
            name="Commission"
            value={formData.Commission}
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
            name="CurrencyToSend"
            value={formData.CurrencyToSend}
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
        <h3>Receiver's details</h3>
        <div className="col-md-4">
          <label htmlFor="validationServerRName" className="form-label">
            Receiver Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServerRName"
            placeholder="Receiver Name"
            name="ReceiverName"
            value={formData.ReceiverName}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerRPhone" className="form-label">
            Receiver Number
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerRPhone"
            placeholder="Phone"
            name="ReceiverPhone"
            value={formData.ReceiverPhone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Currency To Receive
          </label>
          <select
            className={`form-select custom-input ${
              !isValid ? "is-invalid" : ""
            }`}
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            name="CurrencyToReceive"
            value={formData.CurrencyToReceive}
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

        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount To Receive
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="ReceiveAmount"
            min="0"
            value={formData.ReceiveAmount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Charges
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="ChargesAmount"
            min="0"
            value={formData.ChargesAmount}
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

export default MomoMpessaSend;
