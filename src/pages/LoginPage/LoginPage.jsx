import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import myApi from "../../api/apiHandler";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post(`/auth/login`, formState);
      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);
      await authenticateUser();
      navigate("/welcome");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
