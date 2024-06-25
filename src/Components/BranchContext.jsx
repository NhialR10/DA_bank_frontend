import React, { createContext, useState } from "react";
import axios from "axios";
// Create the context object
export const BranchContext = createContext();

// Create a provider component
export const BranchProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branches, setBranches] = useState([]);

  const addBranch = (newBranch) => {
    setBranches([...branches, newBranch]);
  };
  const retserFields = () => {
    setName("");
    setLocation("");
    setPhone("");
  };

  // Function to fetch all users
  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/branches");

      return response.data; // Return array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const deleteBranch = async (branchId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/branches/delete/${branchId}`
      );
      console.log("Branch deleted:", response.data);
      return response.data; // Return success message or confirmation
    } catch (error) {
      console.error(`Error deleting user with ID ${branchId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  // Function to update an existing user
  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/branches/update/${userId}`,
        userData
      );
      console.log("User updated:", response.data);
      return response.data; // Return updated user data or ID if needed
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  return (
    <BranchContext.Provider
      value={{
        branches,
        addBranch,
        location,
        setLocation,
        name,
        setName,
        phone,
        setPhone,
        retserFields,
        fetchBranches,
        deleteBranch,
        updateUser,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};
