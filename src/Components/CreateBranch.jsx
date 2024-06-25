import React, { useContext, useState } from "react";
import axios from "axios";
import { BranchContext } from "./BranchContext";

const CreateBranchForm = () => {
  const {
    addBranch,
    location,
    name,
    phone,
    setName,
    setLocation,
    setPhone,
    retserFields,
  } = useContext(BranchContext);

  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true during form submission

    try {
      const response = await axios.post(
        "http://localhost:8000/api/branches/create",
        {
          location,
          name,
          phone,
        }
      );

      console.log("Branch created:", response.data);
      addBranch(response.data); // Add newly created branch to context
      // Handle success (e.g., update state, show success message)
      retserFields();
    } catch (error) {
      console.error("Error creating branch:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false); // Reset loading state after request completes
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Branch"}
        </button>
      </form>
    </div>
  );
};

export default CreateBranchForm;
