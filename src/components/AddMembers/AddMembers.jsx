import React, { useState } from "react";
import myApi from "../../api/apiHandler";

const AddMembers = () => {
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
    </>
  );
};

export default AddMembers;
