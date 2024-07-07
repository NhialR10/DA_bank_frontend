import React, { useState } from "react";

const SendToBranch = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="sendTobranch">
      <form className="row g-3" autoComplete="off">
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
            autoComplete="off"
            required
          />
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
            required
            autoComplete="off"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Amount
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="phone"
            required
            autoComplete="off"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerPhone" className="form-label">
            Percentage Commission (%)
          </label>
          <input
            type="tel"
            className="form-control custom-input"
            id="validationServerPhone"
            placeholder="Phone"
            name="phone"
            required
            autoComplete="off"
          />
        </div>
        <h3>Reciver's details</h3>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            Receiver Name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="Receiver Name"
            name="firstname"
            autoComplete="off"
            required
          />
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
            required
            autoComplete="off"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Branch
          </label>
          <select
            className="form-select custom-input"
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
            name="role"
          >
            <option value="">Choose...</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div id="validationServerRoleFeedback" className="invalid-feedback">
            Please select a valid role.
          </div>
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

export default SendToBranch;
