import React, { useState } from "react";
import myApi from "../../api/apiHandler";
import { useNavigate } from "react-router-dom";
import "./AddFamily.css";

const AddFamily = () => {
  const [formState, setFormState] = useState({
    name: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await myApi.post("/api/families", formState);
      navigate(`/my-families/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <div className="AddFamily">
      <h2>Create your own family...</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={formState.name}
            onChange={handleChange}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="avatar">Add a picture of your family</label>
          <input
            type="text"
            value={formState.avatar}
            onChange={handleChange}
            id="avatar"
          />
        </div>
        <button>Create family</button>
      </form>
    </div>
  );
};

export default AddFamily;
