import React, { useContext, useState } from "react";
import { CustomerContext } from "./CustomerContex";

const CreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const {
    customerCode,
    createCustomer,
    setShowCustomerCode,
    showCustomerCode,
  } = useContext(CustomerContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCustomer(formData);

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      });
      setShowCustomerCode(true);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismissCode = () => {
    setShowCustomerCode(false);
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
            value={formData.firstname}
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
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
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
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
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

export default CreateCustomer;
