import React, { useState } from "react";

import CreateUser from "./CreateUser";
import ViewUsers from "./ViewUsers";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import CreateBranch from "./CreateBranch";
import ViewBranches from "./ViewBranches";
import UpdateBranch from "./UpdateBranch";
import DeleteBranch from "./DeleteBranch";
import button from "react-bootstrap/Button";
// Import other operation components similarly

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeOperation, setActiveOperation] = useState(null);

  const handleUserOperation = (operation) => {
    setActiveOperation(operation);
  };

  const handleBranchOperation = (operation) => {
    setActiveOperation(operation);
  };

  const renderButtons = () => {
    switch (activeSection) {
      case "user":
        return (
          <div className="operation-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => handleUserOperation("create")}
            >
              Create User
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleUserOperation("view")}
            >
              View Users
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleUserOperation("update")}
            >
              Update User
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleUserOperation("delete")}
            >
              Delete User
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setActiveSection(null)}
            >
              Back
            </button>
          </div>
        );
      case "branch":
        return (
          <div className="operation-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => handleBranchOperation("create")}
            >
              Create Branch
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleBranchOperation("view")}
            >
              View Branches
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleBranchOperation("update")}
            >
              Update Branch
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleBranchOperation("delete")}
            >
              Delete Branch
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setActiveSection(null)}
            >
              Back
            </button>
          </div>
        );
      default:
        return (
          <div className="main1-buttons">
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setActiveSection("user")}
            >
              User Operations
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setActiveSection("branch")}
            >
              Branch Operations
            </button>
          </div>
        );
    }
  };

  const renderOperationComponent = () => {
    switch (activeOperation) {
      case "create":
        return activeSection === "user" ? <CreateUser /> : <CreateBranch />;
      case "view":
        return activeSection === "user" ? <ViewUsers /> : <ViewBranches />;
      case "update":
        return activeSection === "user" ? <UpdateUser /> : <UpdateBranch />;
      case "delete":
        return activeSection === "user" ? <DeleteUser /> : <DeleteBranch />;
      default:
        return <div>Please select an operation</div>;
    }
  };

  return (
    <main className="main1-container">
      <div className="setting-container">
        <div className="setting-left">{renderOperationComponent()}</div>
        <div className="setting-right">{renderButtons()}</div>
      </div>
    </main>
  );
};

export default Settings;
