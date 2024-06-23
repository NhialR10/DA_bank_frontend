import React from "react";

const CreateUser = () => {
  return (
    <div>
      <form className="row g-3" autoComplete="off">
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="First Name"
            autoComplete="off"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer02"
            placeholder="Last Name"
            required
            autoComplete="off"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control custom-input"
            id="validationServerEmail"
            placeholder="nhiallual@gmail.com"
            autoComplete="off"
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationServerPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control custom-input"
            id="validationServerPassword"
            placeholder="Password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationServerRole" className="form-label">
            Role
          </label>
          <select
            className="form-select custom-input"
            id="validationServerRole"
            aria-describedby="validationServerRoleFeedback"
            required
          >
            <option selected disabled value="">
              Choose...
            </option>
            <option>User</option>
            <option>Admin</option>
          </select>
          <div id="validationServerRoleFeedback" className="invalid-feedback">
            Please select a valid role.
          </div>
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
            required
            autoComplete="off"
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
