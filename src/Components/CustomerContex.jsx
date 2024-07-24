import React, { createContext, useState } from "react";
import axios from "axios";
// Create the context object
export const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [Customeres, setCustomeres] = useState([]);
  const [customerCode, setCustomerCode] = useState(null);
  const [showCustomerCode, setShowCustomerCode] = useState(true);
  const addCustomer = (newCustomer) => {
    setCustomeres([...Customeres, newCustomer]);
  };
  const retserFields = () => {
    setName("");
    setLocation("");
    setPhone("");
  };

  // Function to fetch all users
  const fetchCustomeres = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/customers/create"
      );

      return response.data; // Return array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const deleteCustomer = async (CustomerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/Customeres/delete/${CustomerId}`
      );

      return response.data; // Return success message or confirmation
    } catch (error) {
      console.error(`Error deleting user with ID ${CustomerId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const createCustomer = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/customers/create",
        userData
      );

      retserFields(); // Clear form fields after successful creation

      const code = response.data;
      setCustomerCode(code);
      const newCustomer = response.data;
      setShowCustomerCode(true);

      return newCustomer;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  // Function to update an existing user
  const updateCustomeres = async (CustomerId, CustomerData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/Customeres/update/${CustomerId}`,
        CustomerData
      );

      return response.data; // Return updated user data or ID if needed
    } catch (error) {
      console.error(`Error updating user with ID ${CustomerId}:`, error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        Customeres,
        customerCode,
        addCustomer,
        createCustomer,
        location,
        setLocation,
        name,
        setName,
        phone,
        setPhone,
        retserFields,
        fetchCustomeres,
        deleteCustomer,
        updateCustomeres,
        setShowCustomerCode,
        showCustomerCode,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
