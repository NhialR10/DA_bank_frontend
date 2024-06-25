import React, { useContext, useEffect, useState } from "react";
import { BranchContext } from "./BranchContext";
import { UserContext } from "./UserContext";
const ViewBranches = ({
  handleUserOperation,
  setActiveSection,
  seteditBranch,
  setupdatedBranch,
}) => {
  const [branches, setBranches] = useState([]);
  const { fetchBranches, deleteBranch } = useContext(BranchContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { setActiveOperation } = useContext(UserContext);

  useEffect(() => {
    // Fetch Branches when component mounts
    const getBranches = async () => {
      try {
        const fetchedBranches = await fetchBranches();
        setBranches(fetchedBranches);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getBranches();
  }, [fetchBranches]); // Trigger fetchBranches() when fetchBranches changes

  const handleUpdateClick = (branch) => {
    setupdatedBranch(branch); // Set the user to be edited
    setButtonClicked(true);
  };
  useEffect(() => {
    const handleBranchOperation = (operation) => {
      setActiveOperation(operation);
    };
    if (buttonClicked) {
      handleBranchOperation("update");
    }
    setButtonClicked(false);
  }, [buttonClicked, setActiveOperation]);
  const handleDelete = async (branchId) => {
    try {
      await deleteBranch(branchId);
      setBranches((prevBranches) =>
        prevBranches.filter((branch) => branch._id !== branchId)
      );
      console.log("Branch deleted successfully!");
    } catch (error) {
      console.error(`Error deleting user with ID ${branchId}:`, error);
    }
  };
  const handleClick = (branch) => {
    setActiveSection("user");
    handleUserOperation("create");
    seteditBranch(branch);
  };
  return (
    <div className="user-display">
      <table className="table caption-top user-display">
        <caption
          style={{
            color: "#2962ff",
            textAlign: "center",
            textTransform: "capitalize",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          List of branches
        </caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>

            <th scope="col">Update</th>
            <th scope="col">Add User</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch._id}>
              <td>{branch.name}</td>
              <td>{branch.location}</td>
              <td>{branch.phone}</td>
              <td>
                <button
                  onClick={() => {
                    handleUpdateClick(branch);
                  }}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleClick(branch)}
                  className="btn btn-secondary"
                >
                  Add User
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(branch._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {console.log(branches)}
    </div>
  );
};

export default ViewBranches;
