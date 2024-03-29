import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myApi from "../../api/apiHandler";
import "./AuthPages.css";

const SignUpPage = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post(`/auth/signup`, formState);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label htmlFor="username">Name</label>
            <input type="text" id="username" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
