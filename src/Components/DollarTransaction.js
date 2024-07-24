import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const DollarTransaction = () => {
  const [loading, setLoading] = useState(false);
  const { userLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rate: "",
    AmountDollars: "",
    type: "",
    amountInPounds: "",
  });

  const [isValid, setIsValid] = useState(true);

  const ResetFormField = () => {
    setFormData({
      name: "",
      phone: "",
      rate: "",
      AmountDollars: "",
      type: "",
      amountInPounds: "",
    });
  };

  useEffect(() => {
    const amountInPounds = (
      (Number(formData.rate) * Number(formData.AmountDollars)) /
      100
    ).toFixed(2);
    setFormData((prevData) => ({
      ...prevData,
      amountInPounds: isNaN(amountInPounds) ? "" : amountInPounds,
    }));
  }, [formData.rate, formData.AmountDollars]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.type === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/dollarTransaction",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        ResetFormField();
        alert("record added Successfully!");
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
          <label htmlFor="validationServerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServerName"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">
            This field is required and must be a non-negative value.
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Customer Contact
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Contact"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">
            This field is required and must be a non-negative value.
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerRate" className="form-label">
            Dollar Rate (100)
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerRate"
            placeholder="Dollar Rate"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
            min="0"
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerAmountPounds" className="form-label">
            Amount In Pounds
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmountPounds"
            placeholder="Amount In Pounds"
            name="amountInPounds"
            value={formData.amountInPounds}
            readOnly
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerAmountDollars" className="form-label">
            Amount In Dollars
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmountDollars"
            placeholder="Amount In Dollars"
            name="AmountDollars"
            value={formData.AmountDollars}
            onChange={handleInputChange}
            min="0"
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerType" className="form-label">
            Transaction Type
          </label>
          <select
            className={`form-select custom-input ${
              !isValid ? "is-invalid" : ""
            }`}
            id="validationServerType"
            aria-describedby="validationServerTypeFeedback"
            required
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose...
            </option>
            <option value="selling">Selling</option>
            <option value="buying">Buying</option>
          </select>
          {!isValid && (
            <div id="validationServerTypeFeedback" className="invalid-feedback">
              Please select a valid Transaction Type.
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

export default DollarTransaction;
