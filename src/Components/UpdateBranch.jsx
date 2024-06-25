import React, { useState, useEffect, useContext } from "react";
import { BranchContext } from "./BranchContext";

const UpdateBranch = ({ onCancel, updatedbranch }) => {
  const { updateUser } = useContext(BranchContext);

  const [updateBranch, setUpdatedBranch] = useState({
    name: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    if (updatedbranch) {
      setUpdatedBranch({
        _id: updatedbranch._id,
        name: updatedbranch.name || "",
        location: updatedbranch.location || "",
        phone: updatedbranch.phone || "",
      });
    }
  }, [updatedbranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBranch((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(updateBranch._id, updateBranch);
      onCancel(); // Close the update form after successful update
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Branch Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            autoComplete="off"
            name="location"
            value={updateBranch.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Branch Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            autoComplete="off"
            name="name"
            value={updateBranch.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            autoComplete="off"
            name="phone"
            value={updateBranch.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBranch;
