import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BranchContext } from "./BranchContext";
import axios from "axios";

const SendToBranch = () => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const { userLogin } = useContext(AuthContext);
  const { fetchBranches } = useContext(BranchContext);

  const [formData, setFormData] = useState({
    firstname: "",
    phone: "",
    pCommission: "",
    Rfirstname: "",
    Rphone: "",
    amount: "",
    receiverBranch: "",
  });

  const ResetFormField = () => {
    setFormData({
      firstname: "",
      phone: "",
      pCommission: "",
      Rfirstname: "",
      Rphone: "",
      amount: "",
      receiverBranch: "",
    });
  };

  const [isValid, setIsValid] = useState(true);
  const [customerCode, setCustomerCode] = useState(null);
  const [showCustomerCode, setShowCustomerCode] = useState(true);
  useEffect(() => {
    // Fetch Branches when component mounts
    const getBranches = async () => {
      try {
        const fetchedBranches = await fetchBranches();
        setBranches(fetchedBranches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    getBranches();
  }, [fetchBranches]);

  const branchOptions = branches.filter(
    (branch) => branch._id !== userLogin.branch?._id
  );

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
          "https://trustlinks-api.onrender.com/api/branchToBranchTransfer/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userLogin.token}`, // Include token in headers
            },
          }
        );

        ResetFormField();

        setCustomerCode(response.data.code);
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleDismissCode = () => {
    setShowCustomerCode(false);
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
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerAmount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control custom-input"
            id="validationServerAmount"
            placeholder="Amount"
            name="amount"
            min="0"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerCommission" className="form-label">
            Percentage Commission (%)
          </label>
          <input
            type="number"
            step="any"
            className="form-control custom-input"
            id="validationServerCommission"
            placeholder="Percentage Commission"
            name="pCommission"
            value={formData.pCommission}
            onChange={handleInputChange}
            min="0"
            required
          />
          <div className="invalid-feedback">
            This field is required and must be a non-negative value.
          </div>
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
            name="Rfirstname"
            value={formData.Rfirstname}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerRPhone" className="form-label">
            Receiver Phone
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerRPhone"
            placeholder="Phone"
            name="Rphone"
            value={formData.Rphone}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">This field is required.</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Branch
          </label>
          <select
            className={`form-select custom-input ${
              !isValid ? "is-invalid" : ""
            }`}
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            name="receiverBranch"
            value={formData.receiverBranch}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose...
            </option>
            {branchOptions.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </select>
          {!isValid && (
            <div id="validationServerRoleFeedback" className="invalid-feedback">
              Please select a valid branch.
            </div>
          )}
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
      {customerCode && showCustomerCode && (
        <div className="mt-3">
          <h5>Customer Code:</h5>
          <p>{customerCode}</p>
          <button className="btn btn-secondary" onClick={handleDismissCode}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default SendToBranch;
