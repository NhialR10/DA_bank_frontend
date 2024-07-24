import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const UpdateUser = ({ user, onCancel }) => {
  const { updateUser } = useContext(UserContext);
  const [updatedUser, setUpdatedUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, updatedUser); // Use user._id if that's the correct field
      onCancel(); // Close the update form after successful update
    } catch (error) {
      console.error("Error updating user:", error);
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
            value={updatedUser.firstname}
            onChange={handleChange}
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
            name="lastname"
            value={updatedUser.lastname}
            onChange={handleChange}
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
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
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
            name="password"
            value={updatedUser.password}
            onChange={handleChange}
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
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            aria-describedby="validationServerRoleFeedback"
            required
          >
            <option value="" disabled>
              Choose...
            </option>
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
            value={updatedUser.phone}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
