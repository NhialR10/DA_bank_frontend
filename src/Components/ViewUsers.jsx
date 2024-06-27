import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const ViewUsers = ({ setEditingUser }) => {
  const { fetchUsers, deleteUser, setActiveOperation } =
    useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    // Fetch users when component mounts
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [fetchUsers]); // Trigger fetchUsers() when fetchUsers changes

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log("User deleted successfully!");
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  const handleUpdateClick = (user) => {
    setEditingUser(user); // Set the user to be edited
    setButtonClicked(true);
  };

  useEffect(() => {
    const handleUserOperation = (operation) => {
      setActiveOperation(operation);
    };
    if (buttonClicked) {
      handleUserOperation("update");
    }
    setButtonClicked(false);
  }, [buttonClicked, setActiveOperation]);
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
          List of users
        </caption>
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateClick(user)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
