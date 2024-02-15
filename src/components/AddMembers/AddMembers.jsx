import React, { useState } from "react";
import myApi from "../../api/apiHandler";

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
    <>
      <h2>Add Members to your family</h2>
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
            <button onClick={() => handleAddMember(user._id)}>Add</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddMembers;
