import React, { createContext, useState } from "react";
import axios from "axios";

// Create a Context for the user data
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeOperation, setActiveOperation] = useState(null);
  const [userLogin, setUserLogin] = useState(null);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const resetUser = () => {
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    });
  };

  // Function to create a new user
  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "https://trustlinks-api.onrender.com/api/users/create",
        userData
      );

      resetUser(); // Clear form fields after successful creation
      return response.data; // Return created user data or ID if needed
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  // Function to update an existing user
  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(
        `https://trustlinks-api.onrender.com/api/users/update/${userId}`,
        userData
      );
      console.log("User updated:", response.data);
      return response.data; // Return updated user data or ID if needed
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://trustlinks-api.onrender.com/api/users"
      );

      return response.data; // Return array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://trustlinks-api.onrender.com/api/users/delete/${userId}`
      );

      return response.data; // Return success message or confirmation
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const handleUserOperation = (operation) => {
    setActiveOperation(operation);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        resetUser,
        createUser,
        updateUser,
        fetchUsers,
        deleteUser,
        activeSection,
        setActiveSection,
        activeOperation,
        setActiveOperation,
        handleUserOperation,
        setUserLogin,
        userLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
