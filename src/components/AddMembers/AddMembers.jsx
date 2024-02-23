import React, { useState } from "react";
import myApi from "../../api/apiHandler";
import "./AddMembers.css";

const AddMembers = ({ family, isAdmin, setFamily }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.get(`/api/users?search=${search}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Error in search:", error);
    }
  };

  const handleAddMember = async (addedUserId) => {
    try {
      const response = await myApi.put(
        `/api/families/${family._id}/members/add`,
        { addedUserId }
      );
      setFamily(response.data);
    } catch (error) {
      console.error("Failed to add this member", error);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="AddMembers">
      <h3>
        Add Members to your family
        <span> (you see this because you're admin of this family)</span>
      </h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search by name or email"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button
              className="add-member-button"
              onClick={() => handleAddMember(user._id)}
            >
              ⨁
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddMembers;
