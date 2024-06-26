import React, { useContext, useState } from "react";

import CreateUser from "./CreateUser";
import ViewUsers from "./ViewUsers";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import CreateBranch from "./CreateBranch";
import ViewBranches from "./ViewBranches";
import UpdateBranch from "./UpdateBranch";
import DeleteBranch from "./DeleteBranch";
import { UserContext } from "./UserContext";

// Import other operation components similarly
const Settings = ({
  editingUser,
  setEditingUser,
  seteditBranch,
  editBranch,
}) => {
  const handleCancelUpdate = () => {
    setActiveSection(null); // Clear editing user to close the update form
    setActiveOperation(null);
  };
  const {
    activeSection,
    setActiveSection,
    activeOperation,
    setActiveOperation,
  } = useContext(UserContext);
  const [updatedbranch, setupdatedBranch] = useState(null);
  const handleUserOperation = (operation) => {
    setActiveOperation(operation);
  };
  const handleBranchOperation = (operation) => {
    setActiveOperation(operation);
  };

  const onBackButtonClick = () => {
    setActiveSection(null); // Clear editing user to close the update form
    setActiveOperation(null);
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
              className="btn btn-primary"
              onClick={() => onBackButtonClick()}
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
              className="btn btn-primary"
              onClick={() => onBackButtonClick()}
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
        return activeSection === "user" ? (
          <CreateUser editBranch={editBranch} />
        ) : (
          <CreateBranch />
        );
      case "view":
        return activeSection === "user" ? (
          <ViewUsers setEditingUser={setEditingUser} />
        ) : (
          <ViewBranches
            handleUserOperation={handleUserOperation}
            setActiveSection={setActiveSection}
            seteditBranch={seteditBranch}
            setupdatedBranch={setupdatedBranch}
          />
        );
      case "update":
        return activeSection === "user" ? (
          <UpdateUser onCancel={handleCancelUpdate} user={editingUser} />
        ) : (
          <UpdateBranch
            onCancel={handleCancelUpdate}
            updatedbranch={updatedbranch}
          />
        );
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
