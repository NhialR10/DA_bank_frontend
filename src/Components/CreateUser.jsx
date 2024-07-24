import React, { useContext, useState } from "react";

import { UserContext } from "./UserContext";

const CreateUser = ({ editBranch }) => {
  const { user, setUser, resetUser, createUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false); // State to handle loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      ...(editBranch ? { branchId: editBranch._id } : {}), // Conditionally add branchId
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true during form submission
    try {
      await createUser(user); // Call createUser function from context
      resetUser(); // Clear form fields after successful creation
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div>
      <form className="row g-3" autoComplete="off" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="validationServer01"
            placeholder="First Name"
            name="firstname"
            autoComplete="off"
            value={user.firstname}
            onChange={handleChange}
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
            name="lastname"
            autoComplete="off"
            value={user.lastname}
            onChange={handleChange}
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
            name="email"
            autoComplete="off"
            required
            value={user.email}
            onChange={handleChange}
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
            name="password"
            required
            autoComplete="new-password"
            value={user.password}
            onChange={handleChange}
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
            value={user.role}
            name="role"
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
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
            name="phone"
            required
            autoComplete="off"
            value={user.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
